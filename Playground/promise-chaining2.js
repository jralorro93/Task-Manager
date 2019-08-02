require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndRemove('5d426e3b1081a52727029937').then((user) => {
    console.log(user)
    return Task.countDocuments( {completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})