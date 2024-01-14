const express =require('express');
var app= express();
port=3000
function calculate(n){
    var sum=0
    for(var i=0; i<n; i++){
        sum=sum+1
    }
    return sum 
}
function handleFirstRequest(req,res){
    var something = req.query.counter;
    summer=calculate(something)
    resizeBy.send(summer)
}
app.get("/handlesum", handleFirstRequest);
function started() {
  console.log("the server is hosted on localhost:", port);
}
app.listen(port, started);
