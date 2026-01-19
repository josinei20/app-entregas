const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

// All routes require authentication and admin role
router.use(auth, adminOnly);

// Get all deliveries
router.get('/deliveries', adminController.getAllDeliveries);

// Get statistics
router.get('/statistics', adminController.getStatistics);

// Get delivery details
router.get('/deliveries/:id', adminController.getDeliveryDetails);

// Download document
router.get('/deliveries/:id/documents/:documentType/download', adminController.downloadDocument);

// Get driver details
router.get('/drivers/:driverId', adminController.getDriverDetails);

module.exports = router;
