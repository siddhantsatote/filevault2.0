const mongoose = require('mongoose');

const uploadFileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileData: { type: String, required: true }, // Store Base64 encoded data
    createdAt: { type: Date, default: Date.now } // Timestamp for when the file was uploaded
});

module.exports = mongoose.model('UploadFile', uploadFileSchema);
