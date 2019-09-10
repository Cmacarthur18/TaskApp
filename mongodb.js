//CRUD create read update delete -- crud operationjs

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager' // can use any name, this is just the name for out data base

MongoClient.connect(connectionURL, {useNewUrlParser:true} , (error,client) => {// secon param is options object and third is call back and when connection finnishes
    if(error){
        return console.long('Unable to connect to the data base')
    }

    const db = client.db(databaseName)// takes the name of the db we want to manipulate and gives a db reference

    // db.collection('users').deleteMany({
    //     age: 19
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.long(error)
    // })

    db.collection('tasks').deleteOne({
        description: 'first task'
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.long(error)
    })
})

