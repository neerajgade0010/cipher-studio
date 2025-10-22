// ...existing code...
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

function ensureJwtSecret() {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not set in environment');
    }
}

function createTokenForUser(user) {
    ensureJwtSecret();
    const payload = { user: { id: user._id.toString(), firstName: user.firstName } };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3h' });
}

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body || {};
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'firstName, lastName, email and password are required.' });
        }

        const normalizedEmail = String(email).trim().toLowerCase();

        if (await User.findOne({ email: normalizedEmail })) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const user = new User({ firstName: String(firstName).trim(), lastName: String(lastName).trim(), email: normalizedEmail, password });
        await user.save();

        return res.status(201).json({ message: 'User registered successfully.', user: { id: user._id.toString(), firstName: user.firstName, email: user.email } });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Server error during registration.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = createTokenForUser(user);
        return res.json({ token, user: { id: user._id.toString(), firstName: user.firstName, email: user.email } });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login.' });
    }
});

module.exports = router;
// ...existing code...