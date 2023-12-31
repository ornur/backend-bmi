// Function to check if a value is a valid number
function isValidNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

// Function to validate input fields
function validateInputs() {
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');

    if (!isValidNumber(weightInput.value)) {
        alert('Please enter a valid number for weight.');
        return false;
    }

    if (!isValidNumber(heightInput.value)) {
        alert('Please enter a valid number for height.');
        return false;
    }
    
    if (!isValidNumber(ageInput.value) && (ageInput.value < 2 || ageInput.value > 100) ) { 
        alert('Please enter a valid number for age.');
        return false;
    }

    return true;
}

// Function to submit the form
function submitForm() {
    // Validate inputs before submitting the form
    if (!validateInputs()) {
        return;
    }

    // Retrieve user inputs
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const age = parseFloat(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const unit = document.getElementById('unit').value;

    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/calculate-bmi';

    // Create input elements for each parameter
    const weightInput = document.createElement('input');
    weightInput.type = 'hidden';
    weightInput.name = 'weight';
    weightInput.value = weight;

    const heightInput = document.createElement('input');
    heightInput.type = 'hidden';
    heightInput.name = 'height';
    heightInput.value = height;

    const ageInput = document.createElement('input');
    ageInput.type = 'hidden';
    ageInput.name = 'age';
    ageInput.value = age;

    const genderInput = document.createElement('input');
    genderInput.type = 'hidden';
    genderInput.name = 'gender';
    genderInput.value = gender;

    const unitInput = document.createElement('input');
    unitInput.type = 'hidden';
    unitInput.name = 'unit';
    unitInput.value = unit;

    // Append input elements to the form
    form.appendChild(weightInput);
    form.appendChild(heightInput);
    form.appendChild(ageInput);
    form.appendChild(genderInput);
    form.appendChild(unitInput);

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
}

// Add an event listener to the Calculate button
document.getElementById('calculateButton').addEventListener('click', submitForm);
