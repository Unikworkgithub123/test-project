const MESSAGES = {

    // Authentication
    '1001': 'API health status successfully received.',
    '1002': 'The image has been processed successfully.',
    '1003': 'Errors occur while processing the image.',

    // Common
    '9000': 'Please Enter Valid data!',
    '9001': 'Not found',
    '9999': 'Something went wrong!',
}

module.exports.getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};
