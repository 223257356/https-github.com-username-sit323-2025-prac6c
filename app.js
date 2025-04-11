const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Constants for number validation
const MAX_NUMBER = Number.MAX_SAFE_INTEGER;
const MIN_NUMBER = Number.MIN_SAFE_INTEGER;

// Logger middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Utility function to check if inputs are valid numbers
const isValidNumber = (value) => {
    const num = parseFloat(value);
    return !isNaN(num) &&
           value !== null &&
           value !== '' &&
           num <= MAX_NUMBER &&
           num >= MIN_NUMBER;
}

// Root route to check if server is running
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to the Calculator Microservice!',
        endpoints: {
            addition: '/add?num1=x&num2=y',
            subtraction: '/subtract?num1=x&num2=y',
            multiplication: '/multiply?num1=x&num2=y',
            division: '/divide?num1=x&num2=y'
        }
    });
});

// Addition endpoint
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for addition.' });
    }

    const result = num1 + num2;
    res.json({ result });
});

// Subtraction endpoint
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for subtraction.' });
    }

    const result = num1 - num2;
    res.json({ result });
});

// Multiplication endpoint
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for multiplication.' });
    }

    const result = num1 * num2;
    res.json({ result });
});

// Division endpoint
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    if (!isValidNumber(num1) || !isValidNumber(num2)) {
        return res.status(400).json({ error: 'Invalid numbers provided for division.' });
    }

    if (num2 === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed.' });
    }

    const result = num1 / num2;
    res.json({ result });
});

// Set the port and start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Calculator microservice is running at http://localhost:${port}`);
});
