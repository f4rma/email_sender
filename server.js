const path = require('path');
const express = require('express');
const hbs = require('hbs');
const appRoute = require('./routes/route.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'views');
const partialsPath = path.join(__dirname, 'views/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', appRoute);
app.use('/api', appRoute);

// For local development
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`)
    });
}

// Export for Vercel
module.exports = app;