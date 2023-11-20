require('dotenv').config();
require('./helpers/global.js');

const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const upload = multer();


app.use(cors())
app.use(upload.any());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Rate limiting configuration (5 requests per minute)
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
});

// Apply rate limiting to all API endpoints
app.use(limiter);

// import routes 
const imageRoutes = require('./routes/image.routes.js');

// define routes 
app.use('/api', imageRoutes)

// not found url
app.use((req, res) => {
    return RESPONSE.error(res, 9001, 404)
});



module.exports = app
