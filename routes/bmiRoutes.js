const express = require("express");
const router = express.Router();
const path = require("path"); // Import the 'path' module
var strftime = require('strftime')

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
            interpretation: "Invalid input",
            message:
                "Please provide valid input for weight, height, age, gender, and unit.",
        };
    }

    // Convert height to meters if in Imperial units
    if (unit === "imperial") {
        height = height * 2.54; // 1 inch = 2.54 centimeters
    }

    // Convert weight to kilograms if in Imperial units
    if (unit === "imperial") {
        weight = weight * 0.453592; // 1 pound = 0.453592 kilograms
    }
    // Convert centimeters to meters
    height = height / 100;

    // BMI Calculation
    const bmi = weight / (height * height);

    // Interpretation based on age and gender
    let interpretation = "";
    if (age < 18) {
        // BMI categories for age < 18
        if (gender === "male") {
            if (bmi < 18.5) {
                interpretation = `Underweight for ${age} year old male`;
            } else if (bmi <= 24.9) {
                interpretation = `Normal weight for ${age} year old male`;
            } else if (bmi <= 29.9) {
                interpretation = `Overweight for ${age} year old male`;
            } else {
                interpretation = `Obese for ${age} year old male`;
            }
        } else if (gender === "female") {
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
        if (gender === "male") {
            if (bmi < UNDERWEIGHT) {
                interpretation = "Underweight for male";
            } else if (bmi <= NORMAL_WEIGHT) {
                interpretation = "Normal Weight for male";
            } else if (bmi <= OVERWEIGHT) {
                interpretation = "Overweight for male";
            } else {
                interpretation = "Obese for male";
            }
        } else if (gender === "female") {
            if (bmi < UNDERWEIGHT) {
                interpretation = "Underweight for female";
            } else if (bmi <= NORMAL_WEIGHT) {
                interpretation = "Normal Weight for female";
            } else if (bmi <= OVERWEIGHT) {
                interpretation = "Overweight for female";
            } else {
                interpretation = "Obese for female";
            }
        }
    }

    // Return the result
    const timestamp = strftime('%B %d, %Y %H:%M:%S');
    return {
        bmi: parseFloat(bmi.toFixed(2)), // Rounded to 2 decimal places
        interpretation,
        message: `Your BMI is ${bmi.toFixed(2)}. You are ${interpretation}.`,
        timestamp,
    };
};

// History array to store past BMI calculations
let bmiHistory =[];

// Routes
router.get("/", (req, res) => {
    const indexPath = path.join(__dirname, "../public/views/index.html");
    res.sendFile(indexPath);
});

router.get("/about", (req, res) => {
    const aboutPath = path.join(__dirname, "../public/views/about.html");
    res.sendFile(aboutPath);
});

// Route to handle BMI calculation
router.post("/calculate-bmi", (req, res) => {
    const { weight, height, age, gender, unit } = req.body;
    const result = calculateBMI(weight, height, age, gender, unit);

    // Add the result to the history
    bmiHistory.push(result);

    // Render a new page with the result
    res.send(`
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/style.css">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">        
                <title>BMI Result</title>
            </head>
            <body>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand ps-5 me-auto" href="/">BMI Calculator</a>
                <div class="d-flex flex-row align-items-end">
                    <a class="btn text-white" href="/history">BMI History</a>
                    <a class="btn text-white pe-5" href="/about">About</a>
                </div>
            </nav>
            <div class="container">
                <h1 class="text-light">Your BMI Result</h1>
                <p><strong>Your BMI:</strong> ${result.bmi} - ${result.interpretation}</p>
                <p><a href="/" class="btn btn-outline-dark" aria-current="true">Go back to the BMI Calculator</a></p>
            </div>
            <footer class="bg-dark">
                <p class="text-light">Created by NURDAULET | SE-2201</p>
            </footer>
            </body>
        </html>
    `);
});

// Route to handle GET request for viewing the history
router.get('/history', (req, res) => {
    // Render the history page with past BMI calculations
    res.send(`
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/style.css">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">        
                <title>BMI History</title>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand ps-5 me-auto" href="/">BMI Calculator</a>
                    <div class="d-flex flex-row align-items-end">
                        <a class="btn text-white" href="/history">BMI History</a>
                        <a class="btn text-white pe-5" href="/about">About</a>
                    </div>
                </nav>
                <div class="container">
                    <h1>BMI History</h1>
                    <ul>
                        ${bmiHistory.map(entry => `<li> <p class="fw-bold">TIME: ${entry.timestamp}</p> Your index BMI: ${entry.bmi} - ${entry.interpretation}</li>`).join('')}
                    </ul>
                    <p><a href="/" class="btn btn-outline-dark" aria-current="true">Go back to the BMI Calculator</a></p>
                </div>
                <footer class="bg-dark">
                    <p class="text-light">Created by NURDAULET | SE-2201</p>
                </footer>
            </body>
        </html>
    `);
});

module.exports = router;
