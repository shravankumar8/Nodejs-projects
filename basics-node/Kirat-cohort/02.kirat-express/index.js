const express= require("express");
const bodyparser=require("body-parser");
var app= express();
app.use(bodyparser.json())
port =3000
function calculate(n){
    var sum=0
    for(var i=0; i < n; i++){
        sum=sum+i
    }
   
    return sum
}
function handleFirstRequest(req, res){
    counter=req.query.counter
    
    // console.log("the query params are",req.query)
    
    // console.log("the headers are",req.headers)
    var calculatedsum = calculate(counter);
    
    var answer=counter+" for this the sum  is "+calculatedsum
    res.send(answer)
}
app.get("/", handleFirstRequest)
function started(){
    console.log("started")
}
app.listen(port,started)