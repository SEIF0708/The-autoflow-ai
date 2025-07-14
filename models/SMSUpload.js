const mongoose = require('mongoose');

const smsUploadSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    fileUrl: { type: String, required: true },
});

module.exports = mongoose.model('SMSUpload', smsUploadSchema); 