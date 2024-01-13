const express = require("express")
const fs=require("fs")
numberofrequest=0
function dategiver(){
    dateNow = new Date().toLocaleTimeString();
    return dateNow
}
function displayhistory(){
    fs.readFile("./something.txt","utf8",(err,data)=>{
        if(err){
            console.log(err)
            return
        }
        return  

    })
}
function toFile(data,calculatedsum){
    if(data){
        time=dategiver()
        data = time + " => " + data + " => " + calculatedsum + "\n";
        fs.appendFile("./something.txt",data,"utf-8",(err)=>{
            if(err){
                console.error(err)
                return
            }
                // console.log("the file has been written succesfully")
                
        })
    }
    
}
app= express()
port=3001
// function middleware1(req, res, next){
//     console.log("thisis from middle ware", req.query.counter)
//     next()
// }
// app.use(middleware1)
function calculatesum(counter){
    var sum=0
    for (var i=0;i<counter;i++){
        sum=sum+i
    }
    return sum
}
function handleFirstRequest(req,res){
    numberofrequest=1+numberofrequest
    console.log(numberofrequest)
    var counter=req.query.counter
    // console.log(req.headers)
    // console.log(req.query)
    var calculatedsum=calculatesum(counter)

    toFile(counter,calculatedsum)
    var answer="the sum is "+calculatedsum
    res.send(answer)
}
// app.get("/handlesum", handleFirstRequest);
app.post("/handlesum", handleFirstRequest);

function started(){
    console.log("the server is hosted on localhost:",port)
}
app.listen(port,started)