import express, { Request, Response, NextFunction } from 'express';
const app = express();
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
app.use(express.json());
app.use(express.static(dir));

app.listen(sock, () => {console.log("running")})

const csvFilePath = 'users.csv';

interface User {
    username: string;
    password: string;
}

interface AuthenticatedRequest extends Request {
    user?: any;
}

function authenticateToken(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ status: 'error', error: 'Unauthorized' });
    }

    jwt.verify(token, 'secret123', (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ status: 'error', error: 'Invalid token' });
        }

        req.user = user;
        next();
    });
}

app.post('/api/register', async (req: Request, res: Response) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);

        // Read existing users from CSV file
        const users: User[] = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line: string) => {
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

        await csvWriter.writeRecords([
            { username: req.body.username, password: newPassword },
        ]);

        res.json({ status: 'ok' });
    } catch (err) {
        res.json({ status: 'error', error: 'Failed to register user' });
    }
});

app.post('/api/login', async (req: Request, res: Response) => {
    try {
        // Implement login logic using CSV file
        const users: User[] = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line: string) => {
                const [username, password] = line.split(',');
                return { username, password };
            })
            : [];

        const user = users.find((u) => u.username === req.body.username);

        if (!user) {
            return res.json({ status: 'error', error: 'Invalid login' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (isPasswordValid) {
            const token = jwt.sign({ username: user.username }, 'secret123');
            return res.json({ status: 'ok', user: token });
        } else {
            return res.json({ status: 'error', user: false });
        }
    } catch (err) {
        res.json({ status: 'error', error: 'Login failed' });
    }
});

app.get('/api/Biosensor', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users: User[] = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line: string) => {
                const [username, password] = line.split(',');
                return { username, password };
            })
            : [];

        const decoded = jwt.verify(req.headers['x-access-token'], 'secret123');
        const username = decoded.username;
        const user = users.find((u) => u.username === username);

        // Your logic for the Biosensor route here
        res.json({ status: 'ok', message: 'Biosensor data for authenticated user' });
    } catch (error) {
        console.log(error);
        res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
});

app.post('/api/Biosensor', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users: User[] = fs.existsSync(csvFilePath)
            ? fs.readFileSync(csvFilePath, 'utf-8').trim().split('\n').map((line: string) => {
                const [username, password] = line.split(',');
                return { username, password };
            })
            : [];

        const decoded = jwt.verify(req.headers['x-access-token'], 'secret123');
        const username = decoded.username;
        const userIndex = users.findIndex((u) => u.username === username);

        if (userIndex !== -1) {
            res.json({ status: 'ok', message: 'Biosensor data updated for authenticated user' });
        } else {
            res.status(403).json({ status: 'error', error: 'Invalid token' });
        }
    } catch (error) {
        console.log(error);
        res.status(403).json({ status: 'error', error: 'Invalid token' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'))
});
