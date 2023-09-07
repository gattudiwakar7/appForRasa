var express = require('express')
var app = express()
var http = require("http").createServer(app)
var io = require("socket.io")(http)

var db = require("./dataBase/dataOp")
var resPost = require('./requied/sendPutRquest')
var obj = require('./requied/objCreate')

var PORT_ADDR = process.env.PORT || 3000


app.use(express.static("FontPage"))

app.get('/check',(req,res)=>{
    res.status(200)
    res.send('ok')
})
app.get('/android', (req, res) => {
    var name = ''
    var message = ''

    if (req.query.message) {
        message = req.query.message
    }
    if (req.query.name) {
        name = req.query.name
    }

    if (name != "" && message != "") {
        var data = {

            name: req.query.name,
            message: req.query.message
        }

        resPost.sendPutRequest(data)
            .then(data => {
            
                res.status(200)
                res.json(data)
            })
            .catch(err => {
                res.status(401)
                res.send()
                console.log(err)
            })
    }
    else {
        res.status(400)
        res.send()
    }


})
io.on('connection', socket => {
    socket.on("new_user", name => {
        console.log("new_user joined", socket.id, name)
    })
    socket.on("msgToBot", data => {
        db.inserData(obj.obj(data.name || "user", "Bot", data.message))
        console.log("message form user:", data)


        resPost.sendPutRequest(data)
            .then((data) => {
                console.log(data)
                socket.emit("msgFromBot", data)

            })
            .catch(err => {
                console.log(err)
            })
    })
})

http.listen(PORT_ADDR, () => {
    console.log("Sever Listening at : " + PORT_ADDR)
    //db.findAll()

})


