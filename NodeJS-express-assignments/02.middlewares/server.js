const express = require("express");
const app = express();
port = 3000;

function display(req, res) {
  res.send("hello world");
}
// middle ware which logs timestamps and displays type of method of each request
    function log(req, res,next) {
        var something = new Date();
        console.log( something.toLocaleTimeString());
        console.log(req.method)
        next()
    }
app.use(log)
app.get("/", display);
function serverReady() {
  console.log("The server is ready at http://localhost:3000/");
}
app.listen(port, serverReady);
