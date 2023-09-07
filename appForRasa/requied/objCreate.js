var time=require("./findingtime")
function obj(sender,reciver,message){
    
        var obj={
                
            sender:sender,
            receiver:reciver,
            message:message,
            time:time.dateTime() 
        } 
        return obj
    
}
module.exports={obj}