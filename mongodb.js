const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    } 

    const db = client.db(databaseName)

    // db.collection('users').findOne({ _id: new ObjectID('5d3c941d4acbbbf7562c879c') }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to find user')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: "25" }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: "25" }).count((error, count) => {
    //     console.log(count)
    // })

    db.collection('tasks').findOne({_id: new ObjectID('5d3b4a27dc0900f321c6d11c')}, (error, task) => {
        if (error) {
            return console.log('Unable to find task')
        }

        console.log(task)
    })

    db.collection('tasks').find({completed: false}).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to find tasks')
        }

        console.log(tasks)
    })
})