const express = require('express');
const multer = require('multer');
const path = require('path');
const SMSUpload = require('../models/SMSUpload');
const auth = require('../middleware/auth');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Upload SMS file
router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded.' });
        const smsUpload = await SMSUpload.create({
            userId: req.user.userId,
            filename: req.file.filename,
            originalName: req.file.originalname,
            fileUrl: `/uploads/${req.file.filename}`,
        });
        res.status(201).json(smsUpload);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// List user's uploaded SMS files
router.get('/files', auth, async (req, res) => {
    try {
        const files = await SMSUpload.find({ userId: req.user.userId }).sort({ uploadDate: -1 });
        res.json(files);
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router; 