const jwt = require('jsonwebtoken');

const token = jwt.sign({ userId: 123, role: 'estudiante' }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6ImVzdHVkaWFudGUiLCJpYXQiOjE3NDg1Njg5ODksImV4cCI6MTc0ODU3MjU4OX0.daKlOOkjQBS715ZX8gaOVQCxoUPQwuT4wNzkQZ5hles', { expiresIn: '1h' });
console.log(token);
