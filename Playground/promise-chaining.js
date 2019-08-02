require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5d433e8178551234d5f28eb1', {age: 29}).then((user) => {
    console.log(user)
    return User.countDocuments({age: 29})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})