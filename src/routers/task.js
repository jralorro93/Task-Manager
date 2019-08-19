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

//Limit = limits the number of result we get back from any request 
//skip = allows us to iterate over pages
//Example: GET /tasks?limit=10&skip=20
router.get('/tasks', auth, async (req, res) => {
    //we received user from adding auth middleware as an argument
    const match = {}

    // Added filter 
    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        // Added filter 
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate() 
        res.status(200).send(req.user.tasks)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id , owner: req.user._id})
        if (!task) {
            return res.status(404).send({error: 'Task not found!'})
        }
        
        res.status(200).send(task)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'description', 'completed']
    const isValidOperator = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperator) {
        return res.send({error: 'Invalid update'})
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send('Cannot find task')
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router