const express = require("express");
const app = express();
port = 3000;

function Dashboard(req, res) {
    
  res.send("hello world from dashboard");
}

function profile(req, res) {
    
  res.send("hello world from profile");
}

function contact(req, res) {
    
  res.send("hello world from contact");
}

function work(req, res) {
    
  res.send("hello world from work");
}

function refund(req, res) {
    
  res.send("hello world from refund");
}

function talk(req, res) {
    
  res.send("hello world from talk")
}


app.get('/', Dashboard)
app.get('/profile', profile)
app.get('/contact', contact)
app.get('/work', work)
app.get('/refund', refund)
app.get('/talk', talk)
function serverReady(){
    console.log("THE SERVER IS READY AND IS RUNNING ON http://localhost:"+port)
}
app.listen(port, serverReady);
