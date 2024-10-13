const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const path = require("path"); 
const port = 3000;

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://satotesiddhant:W0YPzS4ljznO20JC@filevault.ff69n.mongodb.net/mydb`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to DB at ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
    }
};

connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Change 'public' to your static directory
app.set("view engine", "ejs");
app.set("views", path.resolve("views"));

// Session Configuration
app.use(session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Dummy user for authentication
const USERNAME = 'admin';
const PASSWORD = 'password'; // Change this to a secure password

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
    if (req.session.authenticated) {
        return next();
    }
    res.redirect('/login');
};

// File Storage Setup
const fileSchema = new mongoose.Schema({
    fileName: String,
    fileType: String,
    fileSize: Number,
    fileData: Buffer,
});

const FileModel = mongoose.model('File', fileSchema);

// Multer Setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USERNAME && password === PASSWORD) {
        req.session.authenticated = true;
        return res.redirect('/upload');
    }
    res.send('Invalid username or password');
});

app.get('/upload', isAuthenticated, async (req, res) => {
    const files = await FileModel.find({});
    res.render('uploadfile', { files: files });
});

// Route for image preview
app.get('/file/:id', async (req, res) => {
    try {
        const file = await FileModel.findById(req.params.id);
        if (!file) {
            return res.status(404).send('File not found');
        }
        res.set('Content-Type', file.fileType);
        res.send(file.fileData);
    } catch (error) {
        console.error(`Error fetching file: ${error.message}`);
        res.status(500).send('Internal server error');
    }
});

app.post('/upload', isAuthenticated, upload.single('file'), async (req, res) => {
    try {
        const file = new FileModel({
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            fileData: req.file.buffer,
        });
        
        await file.save();
        console.log(`File saved: ${file.fileName}`);
        res.redirect('/upload');
    } catch (error) {
        console.error(`Error saving file: ${error.message}`);
        res.status(500).send('Internal server error');
    }
});

app.post('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        await FileModel.findByIdAndDelete(req.params.id);
        console.log(`File deleted: ${req.params.id}`);
        res.redirect('/upload');
    } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
        res.status(500).send('Internal server error');
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/upload');
        }
        res.redirect('/login');
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
