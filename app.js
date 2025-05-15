// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chanakiyan', // Replace with your MySQL password
  database: 'mydb'         // Replace with your database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes
app.get('/', (req, res) => {
  res.send('A simple Node App is running on this server');
});

app.get('/forms', (req, res) => {
  res.render('index'); // Renders views/index.ejs
});

app.post('/form_submit', (req, res) => {
  const { name, gender, dob, email, mobile, quota } = req.body;

  const sql = `
    INSERT INTO Studentdetails (Name, Gender, DateOfBirth, Email, MobileNumber, Quota)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [name, gender, dob, email, mobile, quota], function (err) {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send("An error occurred while submitting the form.");
    }
    console.log("Student details added to DB");
    res.send("Form submitted successfully!");
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
