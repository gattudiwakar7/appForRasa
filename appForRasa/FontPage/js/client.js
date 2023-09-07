
const socket=io()

const input=document.getElementById("input")
const submit=document.getElementById('submit');
const msgContainer=document.getElementById("middle");


const name=prompt("Enter Your Name")


const apand=(message,position)=>{
    const msgEle= document.createElement("div")
    msgEle.innerText=message
    msgEle.classList.add("message")
    msgEle.classList.add(position)
    msgContainer.append(msgEle)
    msgContainer.scrollTop = msgContainer.scrollHeight;
   msgContainer.animate({scrollTop: msgContainer.scrollHeight});
    

}


console.log(socket.io.engine.id)
input.click()
socket.emit("new_user",name)


submit.addEventListener('click',()=>{

    var messag=input.value;
    messag=messag.trim()
    
    if(messag){
    apand("You: "+messag,"right")
    
    socket.emit("msgToBot",{
        name:name,
        message:messag
    })
    input.value="";
    
}

})
socket.on('msgFromBot',data=>{
    for(var x in data){
        let list=[]
        for (var y in data[x]){
          list.push(y)  
        }
        if(list[1]=='image')
        {
            var a= document.createElement("img")
                a.src=data[x][list[1]]
                a.width="200"
                a.height="200"
                a.classList.add("message")
                a.classList.add("left")
            msgContainer.append(a)
        }
        else{
        apand("Bot: "+data[x][list[1]],"left")
        }
    }
   
})
  


