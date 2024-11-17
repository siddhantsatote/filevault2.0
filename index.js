const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bodyParser = require("body-parser");
const multer = require("multer");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const app = express();
const port = 3000;

const user = {
  username: 'kali',
  password: 'pass'
};

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://satotesiddhant:W0YPzS4ljznO20JC@filevault.ff69n.mongodb.net/mydb"
    );
    console.log(`Connected to DB`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
  }
};

connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this to parse JSON in request bodies
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

app.use(express.static(path.join(__dirname, "public")));

// MongoDB session store setup
const store = new MongoDBStore({
  uri: "mongodb+srv://satotesiddhant:W0YPzS4ljznO20JC@filevault.ff69n.mongodb.net/mydb",
  collection: "sessions",
});

// Session Configuration
app.use(
  session({
    secret: "your-secret-key", // Change this to a random string
    resave: false,
    saveUninitialized: true,
    store: store, // Use the MongoDB store
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  }
  res.redirect("/");
};

// File Storage Setup
const fileSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  fileSize: Number,
  fileData: Buffer,
});

const FileModel = mongoose.model("File", fileSchema);

// Multer Setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res) => res.render("login"));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    req.session.authenticated = true; // Set session authentication
    res.json({ success: true, message: 'Login successful!' });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

app.get("/upload", isAuthenticated, async (req, res) => {
  const files = await FileModel.find({});
  res.render("uploadfile", { files: files });
});

app.post(
  "/upload",
  isAuthenticated,
  upload.single("file"),
  async (req, res) => {
    try {
      const file = new FileModel({
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        fileData: req.file.buffer,
      });

      await file.save();
      res.redirect("/upload");
    } catch (error) {
      console.error(`Error saving file: ${error.message}`);
      res.status(500).send("Internal server error");
    }
  }
);

app.post("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    await FileModel.findByIdAndDelete(req.params.id);
    res.redirect("/upload");
  } catch (error) {
    console.error(`Error deleting file: ${error.message}`);
    res.status(500).send("Internal server error");
  }
});

app.get("/download/:id", async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.set({
      "Content-Type": file.fileType,
      "Content-Disposition": `attachment; filename="${file.fileName}"`,
    });
    res.send(file.fileData);
  } catch (error) {
    console.error(`Error downloading file: ${error.message}`);
    res.status(500).send("Internal server error");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/upload");
    }
    res.redirect("/");
  });
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
