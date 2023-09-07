var MongoClient = require('mongodb').MongoClient

var url = 'mongodb://localhost:27017'
var db = "test"
var user_chat = "userChat"
var client = new MongoClient(url)

//connection to Database

client.connect((err) => {

    if (err) {
        console.log(err)
    }
    else {
        console.log(("database connected"))
    }
})

var db = client.db(db)
var collection = db.collection(user_chat)

 function findAll() {
    collection.find().toArray()
        .then((data) => {
            console.log(data)
            
            return data
        })
        .catch(err=>{
            console.log(err)
        })
}

function inserData(data) {
    collection.insertOne(data)
        .then((data) => {
            console.log("data inserted")

        }).catch((err) => {
            console.log(err)
        })
}
function deleteAll(){
    collection.deleteMany({})
    .then((data)=>{
        console.log(data)

    })
    .catch((err)=>{
        console.log(err)
    })
}
//deleteAll()
module.exports = { inserData, findAll }