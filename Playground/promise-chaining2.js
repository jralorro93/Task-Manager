require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('5d426e3b1081a52727029937').then((user) => {
//     console.log(user)
//     return Task.countDocuments( {completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5d42649558f96a257e3d21b1').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
