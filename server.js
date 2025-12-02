const express = require('express');
const app = express();

// Middleware to handle JSON data
app.use(express.json());

// Sample data (like a small database)
let users = [
  { id: 1, name: 'Alice', email: 'alice@gmail.com' },
  { id: 2, name: 'jake', email: 'jake@gmail.com' },
  { id: 3, name: 'Marc Ryan', email: 'cc.marcryan.corpuz@cvsu.edu.ph' }
];

// ✅ GET - Read all users
app.get('/users', (req, res) => {
  res.json(users);
});

// ✅ POST - Add new user
app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// ✅ PUT - Update a user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { id, ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// ✅ DELETE - Remove a user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  users = users.filter(u => u.id !== id);
  res.json({ message: 'User deleted' });
});

// Run the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



