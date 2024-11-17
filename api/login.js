const express = require('express');
const router = express.Router();

const user = { username: 'kali', password: 'pass' }; // Example user credentials

// POST /api/login - Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Received username:", username, "password:", password); // Debugging
    if (username === user.username && password === user.password) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});


module.exports = router;