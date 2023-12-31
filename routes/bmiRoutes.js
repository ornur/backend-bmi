const express = require('express');
const router = express.Router();
const path = require('path'); // Import the 'path' module

// BMI Calculation Logic
const calculateBMI = (weight, height, age, gender, unit) => {
    // Constants for BMI categories
    const UNDERWEIGHT = 18.5;
    const NORMAL_WEIGHT = 24.9;
    const OVERWEIGHT = 29.9;

    // Convert height to meters if in Imperial units
    if (unit === 'imperial') {
        height = height * 0.0254; // 1 inch = 0.0254 meters
    }

    // Convert weight to kilograms if in Imperial units
    if (unit === 'imperial') {
        weight = weight * 0.453592; // 1 pound = 0.453592 kilograms
    }

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

    // You can customize the return statement based on your needs
    return {
        bmi: parseFloat(bmi.toFixed(2)), // Rounded to 2 decimal places
        interpretation,
        message: `Your BMI is ${bmi.toFixed(2)}. You are ${interpretation}.`
    };
};


// Routes

router.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../public/views/index.html');
    res.sendFile(indexPath);
});



router.route('/bmicalculator')
    .get((req, res) => {
        res.sendFile(__dirname + '/public/views/index.html');
    })
    .post((req, res) => {
        const { weight, height, age, gender, unit } = req.body;
        const result = calculateBMI(weight, height, age, gender, unit);
        // Send the result back to the client
        res.send(result);
    });

module.exports = router;