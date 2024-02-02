const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/nano-webapp')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            username: req.body.username,
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error', error: 'Duplicate username' })
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    })

    if (!user) { return { status: 'error', error: 'Invalid login' }}

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if (isPasswordValid) {
        const token = jwt.sign(
            {
                username: user.username,
            }, 
            'secret123'
        )
        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.get('/api/Biosensor', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const username = decoded.username
        const user = await User.findOne({ username: username })

        return res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        req.json({ status: 'error', error: 'invalid token'})
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (user) {
        const token = jwt.sign(
            {
                username: user.username,
            }, 'secret123'
        )
        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.post('/api/Biosensor', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const username = decoded.username
        await User.updateOne({ username: username } )

        return { status: 'ok' }
    } catch (error) {
        console.log(error)
        req.json({ status: 'error', error: 'invalid token'})
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (user) {
        const token = jwt.sign(
            {
                username: user.username,
            }, 'secret123'
        )
        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false })
    }
})

app.listen(1337, () => {
    console.log('Server started on 1337')
})