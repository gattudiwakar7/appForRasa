
var axios = require('axios');
var db = require("../dataBase/dataOp")
var obj = require("./objCreate")

const { text } = require('express');

const sendPutRequest = async (data) => {
    //var data = JSON.parse(JSON.stringify(data.body))
    try {
        var resp = await axios({
            method: 'POST',
            url: 'http://localhost:5005/webhooks/rest/webhook',
            data:
            {
                "sender": data['name'],
                "message": data['message']
            }

        });


        var resFromRasa = resp.data
        for (var x in resFromRasa) {

            var fiels = []
            for (var y in resFromRasa[x]) {
                fiels.push(y)
            }

            db.inserData(obj.obj("Bot", resFromRasa[x][fiels[0]], resFromRasa[x][fiels[1]]))

        }

        //res.render("index", { "bot": resFromRasa })
       // db.findAll()
      // console.log(resFromRasa)
        return resFromRasa;

    } catch (err) {
        // Handle Error Here
        console.error("error enconter in fatachingdata" + err);
    }
}

module.exports = { sendPutRequest}