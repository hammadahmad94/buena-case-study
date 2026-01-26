const extractionService = require('../services/extraction.service');

const uploadAndExtract = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const buffer = req.file.buffer;
        const data = await extractionService.extractDataFromPdf(buffer);

        res.json(data);
    } catch (error) {
        console.error('Upload controller error:', error);
        res.status(500).json({ message: 'Failed to process file', error: error.message });
    }
};

module.exports = {
    uploadAndExtract
};
