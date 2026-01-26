const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/properties.controller');

router.get('/', propertyController.getAllProperties);

router.post('/', propertyController.createProperty);

router.get('/:id', propertyController.getPropertyById);

module.exports = router;
