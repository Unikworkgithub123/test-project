const router = require('express').Router();

// Controller
const ImageController = require('../controllers/image.controller');

//<---------------------------------  Routes  ------------------------------------------>
router.post('/process-image', ImageController.processImage);
router.get('/status', ImageController.getApiHealthStatus);


module.exports = router