const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
       ...req.body,
       owner:  req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    const tasks = await Task.find({})
    
    try {
        res.status(200).send(tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send({error: 'Task not found!'})
        }
        
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description', 'completed']
    const isValidOperator = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperator) {
        return res.send({error: 'Invalid update'})
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send('Cannot find task')
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router