const express = require('express');
const app= express();
port=3000

function display(req,res){


    res.send("hello world");
    
}
app.get('/', display)
function serverReady(){
    console.log("The server is ready at http://localhost:3000/")
}
app.listen(port,serverReady)