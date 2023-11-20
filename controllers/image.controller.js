// files
const db = require('../config/db.config');

// modules
const Validator = require("validatorjs");

// models
const Image = db.image;

/**
 *Process the image and return
 */
const processImage = async (req, res) => {
    let validation = new Validator(req.body, {
        image_url: 'required',
    });
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage));
    }
    try {
        const { image_url } = req.body;
        const imageData = await FILEACTION.uploadFile(image_url);
        if (!imageData.success) {
            return RESPONSE.error(res, 1003)
        };
        const image = await Image.create({ modified_image: imageData.modifiedImage, original_image: imageData.originalImage })
        return RESPONSE.success(res, 1002, image);
    } catch (error) {
        console.log(error)
        return RESPONSE.error(res, 9999)
    }
};

/**
 * Get api health status
 */
const getApiHealthStatus = async (req, res) => {
    try {
        // Health check response
        const healthCheck = {
            status: 'API is running',
            timestamp: new Date().toISOString(),
        };

        // Get package.json dependencies
        const packageJson = require('../package.json');
        const dependencies = packageJson.dependencies;

        const response = {
            ...healthCheck,
            dependencies,
        };

        return RESPONSE.success(res, 1001, response)
    } catch (error) {
        console.log(error)
        return RESPONSE.error(res, 9999)
    }
};



module.exports = {
    processImage,
    getApiHealthStatus,
}