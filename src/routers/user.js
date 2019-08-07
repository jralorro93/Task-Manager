const express = require('express')
const User = require('../models/user')
const router = new express.Router()

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router