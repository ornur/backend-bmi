const express = require('express');
const router = express.Router();
const path = require('path'); // Import the 'path' module

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
        height = height * 2.54; // 1 inch = 2.54 centimeters
    }

    // Convert weight to kilograms if in Imperial units
    if (unit === 'imperial') {
        weight = weight * 0.453592; // 1 pound = 0.453592 kilograms
    }
    // Convert centimeters to meters
    height = height / 100;

    // BMI Calculation
    const bmi = weight / (height * height);

    // Interpretation based on age and gender
    let interpretation = '';
    if (age < 18) {
        // BMI categories for age < 18
        if (gender === 'male') {
            if (bmi < 18.5) {
                interpretation = `Underweight for ${age} year old male`;
            } else if (bmi <= 24.9) {
                interpretation = `Normal weight for ${age} year old male`;
            } else if (bmi <= 29.9) {
                interpretation = `Overweight for ${age} year old male`;
            } else {
                interpretation = `Obese for ${age} year old male`;
            }
        } else if (gender === 'female') {
            if (bmi < 18.5) {
                interpretation = `Underweight for ${age} year old female`;
            } else if (bmi <= 24.9) {
                interpretation = `Normal weight for ${age} year old female`;
            } else if (bmi <= 29.9) {
                interpretation = `Overweight for ${age} year old female`;
            } else {
                interpretation = `Obese for ${age} year old female`;
            }
        }
    } else {
        // Interpretation for adults
        if (gender === 'male') {
            if (bmi < UNDERWEIGHT) {
                interpretation = 'Underweight for male';
            } else if (bmi <= NORMAL_WEIGHT) {
                interpretation = 'Normal Weight for male';
            } else if (bmi <= OVERWEIGHT) {
                interpretation = 'Overweight for male';
            } else {
                interpretation = 'Obese for male';
            }
        } else if (gender === 'female') {
            if (bmi < UNDERWEIGHT) {
                interpretation = 'Underweight for female';
            } else if (bmi <= NORMAL_WEIGHT) {
                interpretation = 'Normal Weight for female';
            } else if (bmi <= OVERWEIGHT) {
                interpretation = 'Overweight for female';
            } else {
                interpretation = 'Obese for female';
            }
        }
    }

    // Return the result
    return {
        bmi: parseFloat(bmi.toFixed(2)), // Rounded to 2 decimal places
        interpretation,
        message: `Your BMI is ${bmi.toFixed(2)}. You are ${interpretation}.`,
    };
};



// Routes

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(indexPath);
});

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
                <p><strong>Your BMI:</strong> ${result.bmi} - ${result.interpretation}</p>
                <p><a href="/">Go back to the BMI Calculator</a></p>
            </body>
        </html>
    `);
});

module.exports = router;