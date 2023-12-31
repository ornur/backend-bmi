# BMI Calculator App

This is a simple BMI (Body Mass Index) calculator web application built with Express.js and Bootstrap for clean and responsive design.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/ornur/backend-bmi.git
```

2. Navigate to the project directory:

```bash
cd backend-bmi
```

3. Install dependencies using npm:

```bash
npm install
```

## Running the Application

1. Start the server:

```bash
npm start
```

Open your web browser and go to http://localhost:3000

## Usage
- The BMI calculator can be accessed at the home page http://localhost:3000 or through the '/bmicalculator' route.
- Input your weight, height, age, gender, and select the unit system (Imperial or Metric).
- Press the 'Calculate' button to get your BMI result and interpretation.

## Dependencies
- Express.js - Fast, unopinionated, minimalist web framework for Node.js.
- Body Parser - Node.js body parsing middleware.

## Bonus Feature (History)
- The application includes a bonus feature that stores past BMI calculations with timestamps.
- To view the history, you can implement a route (e.g., '/history') in the bmiRoutes.js file.

## Author
- Nurdaulet
- SE-2201
