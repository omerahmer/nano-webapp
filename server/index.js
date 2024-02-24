const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/nano-webapp');

// Middleware to check for a valid token
const authenticateToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ status: 'error', error: 'Unauthorized' });

    jwt.verify(token, 'secret123', (err, user) => {
        if (err) return res.status(403).json({ status: 'error', error: 'Invalid token' });

        req.user = user;
        next();
    });
};

// Registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            username: req.body.username,
            password: newPassword,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate username' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.json({ status: 'error', error: 'Invalid login' });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign({ username: user.username }, 'secret123');
        return res.json({ status: 'ok', user: token });
    } else {
        return res.json({ status: 'error', user: false });
    }
});

// Private Biosensor route
app.get('/Biosensor', authenticateToken, async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers['x-access-token'], 'secret123');
        const username = decoded.username;
        const user = await User.findOne({ username: username });

        // Your logic for the Biosensor route here
        res.json({ status: 'ok', message: 'Biosensor data for authenticated user' });
    } catch (error) {
        console.log(error);
        res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
});

// Update Biosensor route (POST)
app.post('/Biosensor', authenticateToken, async (req, res) => {
    try {
        const decoded = jwt.verify(req.headers['x-access-token'], 'secret123');
        const username = decoded.username;
        await User.updateOne({ username: username });

        res.json({ status: 'ok', message: 'Biosensor data updated for authenticated user' });
    } catch (error) {
        console.log(error);
        res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
});

app.listen(1337, () => {
    console.log('Server started on 1337');
});
