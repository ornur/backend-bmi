const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const bmiRoutes = require('./routes/bmiRoutes');
app.use('/', bmiRoutes);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
