
const express = require("express");
var app = express();

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

port = 3000;
function calculate(n) {
  var sum = 0;
  for (var i = 0; i < n; i++) {
    sum = sum + i;
  }

  return sum;
}
function handleFirstRequest(req, res) {
  counter = req.body.counter;
  console.log(req)
  console.log("the query params are",req.query)

//   console.log("the headers are",req.headers)
  var calculatedsum = calculate(counter);

  var answer = counter + " for this the sum  is " + calculatedsum;
  res.send(answer);
}
app.post("/", handleFirstRequest);
function started() {
  console.log("started");
}
app.listen(port, started);
