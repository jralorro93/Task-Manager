const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    } 

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Juan',
    //     age: '25'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)

    // })

//     db.collection('users').insertMany([
//         {
//             name: 'Jen',
//             age: '25'
//         },
//         {
//             name: 'Andrew',
//             age: '29'
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('Unalbe to insert documents')
//         }

//         console.log(result.ops)
//     })
// })

    db.collection('tasks').insertMany([
        {
            description: 'Mean',
            completed: false
        },
        {
            description: 'Cranky',
            completed: false
        },
        {
            description: 'Tired',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents')
        }

        console.log(result.ops)
    })
})