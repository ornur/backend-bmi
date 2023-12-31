const express = require('express');
const bodyParser = require('body-parser');
const bmiRoutes = require('./routes/bmiRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/', bmiRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
