const express = require('express');
const router = express.Router();
const multer = require('multer');
const extractionController = require('../controllers/extraction.controller');

// Limits: 10MB file size
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } 
});

router.post('/', upload.single('file'), extractionController.uploadAndExtract);

module.exports = router;
