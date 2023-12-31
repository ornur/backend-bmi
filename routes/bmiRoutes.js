const express = require('express');
const router = express.Router();
const path = require('path'); // Import the 'path' module

// Routes

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(indexPath);
});

// BMI Calculation Logic
const calculateBMI = (weight, height, age, gender, unit) => {
    // Constants for BMI categories
    const UNDERWEIGHT = 18.5;
    const NORMAL_WEIGHT = 24.9;
    const OVERWEIGHT = 29.9;

    // Check for invalid or missing input values
    if (isNaN(weight) || isNaN(height) || isNaN(age) || !gender || !unit) {
        return {
            bmi: null,
            interpretation: 'Invalid input',
            message: 'Please provide valid input for weight, height, age, gender, and unit.',
        };
    }

    // Convert height to meters if in Imperial units
    if (unit === 'imperial') {
        height = height * 0.0254; // 1 inch = 0.0254 meters
    }

    // Convert weight to kilograms if in Imperial units
    if (unit === 'imperial') {
        weight = weight * 0.453592; // 1 pound = 0.453592 kilograms
    }
    // Convert centimeters to meters
    height = height / 100;

    // BMI Calculation
    const bmi = weight / (height * height);

    // Interpretation
    let interpretation = '';
    if (bmi < UNDERWEIGHT) {
        interpretation = 'Underweight';
    } else if (bmi <= NORMAL_WEIGHT) {
        interpretation = 'Normal Weight';
    } else if (bmi <= OVERWEIGHT) {
        interpretation = 'Overweight';
    } else {
        interpretation = 'Obese';
    }

    // Return the result
    return {
        bmi: parseFloat(bmi.toFixed(2)), // Rounded to 2 decimal places
        interpretation,
        message: `Your BMI is ${bmi.toFixed(2)}. You are ${interpretation}.`,
    };
};

// Route to handle BMI calculation
router.post('/calculate-bmi', (req, res) => {
    const { weight, height, age, gender, unit } = req.body;
    const result = calculateBMI(weight, height, age, gender, unit);

    // Render a new page with the result
    res.send(`
        <html>
            <head>
                <title>BMI Result</title>
            </head>
            <body>
                <h1>Your BMI Result</h1>
                <p><strong>Your BMI:</strong> ${result.bmi} - ${result.interpretation}. ${result.message}</p>
                <p><a href="/">Go back to the BMI Calculator</a></p>
            </body>
        </html>
    `);
});

module.exports = router;