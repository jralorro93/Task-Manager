const { MongoClient, ObjectID } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    } 

    const db = client.db(databaseName)

    ///////////////////////////////////////////// CREATE /////////////////////////////////////////////
    // db.collection('users').insertOne({
    //     name: 'Aj',
    //     age: '31'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }

    //     console.log(result.ops)
    // })


    ///////////////////////////////////////////// READ /////////////////////////////////////////////
    // db.collection('users').findOne({
    //     _id: new ObjectID('5d425add43cbd0238411581c')
    // }, (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     console.log(result)
    // })



    ///////////////////////////////////////////// UPDATE /////////////////////////////////////////////
    // db.collection('users').updateOne({ 
    //     _id: new  ObjectID("5d3b45093ebb39f229a7942c")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })



    ///////////////////////////////////////////// DELETE /////////////////////////////////////////////
    // db.collection('users').deleteMany({
    //     age: 29
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})