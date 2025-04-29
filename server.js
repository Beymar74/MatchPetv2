// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 4000;

app.use(bodyParser.json());

const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario TEXT UNIQUE NOT NULL,
  contraseña TEXT NOT NULL
)`);

app.post('/api/auth/register', (req, res) => {
  const { usuario, contraseña } = req.body;

  if (!usuario || !contraseña) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  bcrypt.hash(contraseña, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error registering user' });
    }

    const query = 'INSERT INTO users (usuario, contraseña) VALUES (?, ?)';
    db.run(query, [usuario, hashedPassword], function (err) {
      if (err) {
        return res.status(500).json({ message: 'Error registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

app.post('/api/auth/login', (req, res) => {
  const { usuario, contraseña } = req.body;

  const query = 'SELECT * FROM users WHERE usuario = ?';
  db.get(query, [usuario], (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Error authenticating user' });
    }

    if (!row) {
      return res.status(401).json({ message: 'Incorrect username or password' });
    }

    bcrypt.compare(contraseña, row.contraseña, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Incorrect username or password' });
      }
      res.status(200).json({ message: 'Login successful' });
    });
  });
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});