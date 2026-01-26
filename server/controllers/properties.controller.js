const propertyService = require('../services/properties.service');

const getAllProperties = async (res) => {
    try {
        const properties = await propertyService.findAll();
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const createProperty = async (req, res) => {
    try {
        if (!req.body.name || !req.body.type) {
            return res.status(400).json({ message: 'Missing required fields: name, type' });
        }

        const newProperty = await propertyService.create(req.body);
        res.status(201).json(newProperty);
    } catch (error) {
        console.error('Error creating property:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const property = await propertyService.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }
        res.json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllProperties,
    createProperty,
    getPropertyById
};
