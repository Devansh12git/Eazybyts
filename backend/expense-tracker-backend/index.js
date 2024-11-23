const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'devansh'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database.');
});

// Routes
app.get('/api/expenses', (req, res) => {
    const query = 'SELECT * FROM expenses';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching expenses');
        } else {
            res.json(results);
        }
    });
});

app.post('/api/expenses', (req, res) => {
    const { category, amount, date } = req.body;
    const query = 'INSERT INTO expenses (category, amount, date) VALUES (?, ?, ?)';
    db.query(query, [category, amount, date], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error adding expense');
        } else {
            res.status(201).send('Expense added successfully');
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Backend API is running at http://localhost:${port}`);
});
