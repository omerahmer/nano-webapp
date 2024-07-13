"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const http = require('http');
const dir = "/home/n/na/nanotech/nano-website/server/static";
const sock = process.env.PORT || '/srv/apps/$USER/$USER.sock';
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.static(dir));
app.listen(sock, () => { console.log("running"); });
const csvFilePath = 'users.csv';
function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ status: 'error', error: 'Unauthorized' });
    }
    jwt.verify(token, 'secret123', (err, user) => {
        if (err) {
            return res.status(403).json({ status: 'error', error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPassword = yield bcrypt.hash(req.body.password, 10);
        // Read existing users from CSV file
        const users = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line) => {
                const [username, password] = line.split(',');
                return { username, password };
            })
            : [];
        const isDuplicate = users.some((user) => user.username === req.body.username);
        if (isDuplicate) {
            return res.json({ status: 'error', error: 'Duplicate username' });
        }
        // Append new user to CSV file
        const csvWriter = createCsvWriter({
            path: csvFilePath,
            header: ['username', 'password'],
            append: true,
        });
        yield csvWriter.writeRecords([
            { username: req.body.username, password: newPassword },
        ]);
        res.json({ status: 'ok' });
    }
    catch (err) {
        res.json({ status: 'error', error: 'Failed to register user' });
    }
}));
app.post('/api/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Implement login logic using CSV file
        const users = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line) => {
                const [username, password] = line.split(',');
                return { username, password };
            })
            : [];
        const user = users.find((u) => u.username === req.body.username);
        if (!user) {
            return res.json({ status: 'error', error: 'Invalid login' });
        }
        const isPasswordValid = yield bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ username: user.username }, 'secret123');
            return res.json({ status: 'ok', user: token });
        }
        else {
            return res.json({ status: 'error', user: false });
        }
    }
    catch (err) {
        res.json({ status: 'error', error: 'Login failed' });
    }
}));
app.get('/api/Biosensor', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line) => {
                const [username, password] = line.split(',');
                return { username, password };
            })
            : [];
        const decoded = jwt.verify(req.headers['x-access-token'], 'secret123');
        const username = decoded.username;
        const user = users.find((u) => u.username === username);
        // Your logic for the Biosensor route here
        res.json({ status: 'ok', message: 'Biosensor data for authenticated user' });
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
}));
app.post('/api/Biosensor', authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line) => {
                const [username, password] = line.split(',');
                return { username, password };
            })
            : [];
        const decoded = jwt.verify(req.headers['x-access-token'], 'secret123');
        const username = decoded.username;
        const userIndex = users.findIndex((u) => u.username === username);
        if (userIndex !== -1) {
            res.json({ status: 'ok', message: 'Biosensor data updated for authenticated user' });
        }
        else {
            res.status(403).json({ status: 'error', error: 'Invalid token' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
}));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
});
