const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is on port ' + port)

})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {

    /////////// Checking owner of a task
    // const task = await Task.findById('5d55715b3bad51554d20da58')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)
   
   
   /////////// Checking tasks of specific user
    // const user = await User.findById('5d548f2b337c3d547c93599b')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)

}
main()