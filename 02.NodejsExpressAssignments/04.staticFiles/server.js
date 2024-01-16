const express = require("express");
const path = require("path");

// const image=new Image(  )
// image.src = "/1.jpg"
const app = express();
port = 3000;

function display(req, res) {
  res.sendFile(path.join(__dirname , "1.jpg"));
}
function displayhtml(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
}
app.get("/imagesend", display);
app.get("/htmlsend", displayhtml);
function serverReady() {
  console.log("The server is ready at http://localhost:3000/");
}
app.listen(port, serverReady);
