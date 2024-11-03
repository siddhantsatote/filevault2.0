# FileVault 2.0

### A web-based file storage application

---

## Features
- **Cross-Device Accessibility**: Access your files from any device using a Chrome browser, whether it’s a desktop, tablet, or mobile device.
- **File Upload**: Upload files directly by selecting them, and they will be available immediately.
- **Preview Files**: Preview files such as images, PDFs, and Word documents directly within the browser.
- **Download Files**: Easily download any uploaded file with a single click.
- **Real-time File Management**: Add, preview, download, and delete files in real-time without refreshing the page.
- **Responsive Design**: The web app is fully responsive and adjusts to different screen sizes.

---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: A web framework for building server-side applications.
- **MongoDB (Atlas)**: A cloud-based database service for storing file metadata.
- **Multer**: Middleware for handling file uploads (`multipart/form-data`).
- **EJS**: Embedded JavaScript templating for dynamic HTML rendering.
- **HTML, CSS, JavaScript**: Frontend technologies for building the user interface.

---

## Screenshots
1. **Home Page with Upload Feature**
   ![Screenshot 2024-10-13 202848](https://github.com/user-attachments/assets/03a2e49f-7826-44c2-a0bd-f4645ebb9b5e)

3. **File Preview Section**
   ![Screenshot 2024-10-24 174849](https://github.com/user-attachments/assets/ddf59c24-e0f8-4bfd-a4f5-fb56e8834aca)


---

## How to Run Locally

### Prerequisites
Before running the project, make sure you have the following installed:
- **Node.js** (version >= 14.x)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (for cloud database)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/filevault2.0.git
   cd filevault2.0
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Setup MongoDB Atlas**

   - [Sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new cluster.
   - In your cluster, add a new database user under the **Database Access** tab.
   - Whitelist your IP address under **Network Access**.
   - Replace the connection URI in the `app.js` file with your **MongoDB Atlas URI**, including your username and password. It should look like this:
   
     ```javascript
     mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/filevault?retryWrites=true&w=majority', {
       useNewUrlParser: true,
       useUnifiedTopology: true
     });
     ```

   - Replace `<username>` and `<password>` with the credentials you set in MongoDB Atlas.

4. **Start the Server**

   ```bash
   npm start
   ```

5. Open your browser and go to:

   ```bash
   http://localhost:3000
   ```

---

## How to Deploy on Vercel

1. **Sign up for Vercel**

   If you don't have a Vercel account, sign up at [Vercel](https://vercel.com/).

2. **Install the Vercel CLI** (optional, for command-line deployment)

   ```bash
   npm install -g vercel
   ```

3. **Connect the Repository to Vercel**

   - If you haven't already, push your code to GitHub.
   - Go to the Vercel Dashboard and click **Add New Project**.
   - Select **Import Git Repository**, and choose your FileVault project repository.
   - For **Framework Preset**, select **Node.js**.

4. **Configure Environment Variables**

   In your Vercel project settings, configure the following environment variables:

   - `MONGO_URI`: Your MongoDB Atlas connection string, including the username and password.

   Example:

   ```
   MONGO_URI = mongodb+srv://<username>:<password>@cluster0.mongodb.net/filevault?retryWrites=true&w=majority
   ```

5. **Deploy**

   After connecting the GitHub repository and configuring the environment variables, click **Deploy**. Vercel will automatically build and deploy your application.

6. **Access Your Live Application**

   Once deployed, your application will be live at the generated Vercel URL (e.g., `https://yourproject.vercel.app`).

---

## Usage Instructions

### Uploading a File

1. **Select a file** by clicking the "Select File to Upload" button.
2. The file will automatically upload once selected, and it will appear in the gallery.
3. You can **preview**, **download**, or **delete** the file using the buttons provided.

### Previewing Files

- Supported formats:
  - **Images**: Displays an inline preview of image files.
  - **PDFs**: Displays an inline PDF viewer.
  - **Word Documents**: Opens the document via Google Docs Viewer in the preview section.

### Downloading Files

- To download a file, click the **Download** button below each file in the gallery.

---

## File Structure

```bash
.
├── public              # Static files (CSS, Images, etc.)
├── views               # EJS templates for the frontend
├── uploads             # Directory for storing uploaded files
├── routes              # Express routes for handling file uploads, previews, etc.
├── app.js              # Main server file
├── README.md           # Project documentation
├── package.json        # Project dependencies and scripts
```

---

## To-Do / Future Features

- **Folder Management**: Ability to create and organize files into folders.
- **File Search**: Add a search bar to quickly find specific files.
- **Multi-File Upload**: Support for uploading multiple files simultaneously.
- **User Authentication**: Secure file access with user login and registration.
- **Storage Quota**: Set limits on the number of files or total storage per user.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributions

Contributions are welcome! Feel free to fork the project and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## Contact

- **Author**: Siddhant Satote 
- **Email**: satotecodes@gmail.com
- **GitHub**: [siddhantsatote](https://github.com/siddhantsaotote)

---
