const uid = require('rand-token').uid;
const fs = require("fs");
const path = require('path');
var Jimp = require("jimp");

async function uploadFile(url) {
    const dir = './public/images';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    try {
        // Use await to wait for the result of Jimp processing
        const image = await Jimp.read(url);


        // Save the original image to a temporary file
        const originalName = uid(16) + path.extname(url);
        const originalImagePath = './public/images/originalImages/' + originalName;
        await image.writeAsync(originalImagePath);


        // Add grayscale filter
        image.greyscale();

        // Crop the image to 200x200
        image.cover(200, 200);

        // Save the processed image to a temporary file
        let imageName = uid(16) + path.extname(url);
        const uploadPath = './public/images/modifiedImages/' + imageName;
        await image.writeAsync(uploadPath);

        return {
            success: true,
            modifiedImage: imageName,
            originalImage: originalName
        };
    } catch (err) {
        // Handle an exception.
        console.log('err :>> ', err);
        return {
            success: false
        };
    }
};

async function deleteFile(fileName, pathFolder = 'image') {
    try {
        const deletePath = './public/' + pathFolder + '/' + fileName;
        await fs.unlinkSync(deletePath);
        return true
    }
    catch (e) {
        return false
    }
}



module.exports = {
    uploadFile,
    deleteFile
};
