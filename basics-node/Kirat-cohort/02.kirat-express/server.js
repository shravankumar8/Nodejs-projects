const express = require("express");
var app = express();

port = 3000;

function calculate(n) {
  var sum = 0;
  for (var i = 0; i <= n; i++) {
    sum = sum + i;
  }

  return sum;
}

function handleFirstRequest(req, res) {
  counter = req.query.counter;

  var calculatedsum = calculate(counter);
    var answer="the calculated sum is " + calculatedsum
    var anserobj = {
      name: "shravan",
      age: 18,
      address: "hyderabad",
      counter: calculatedsum,
    };
  res.send(anserobj); // Convert the sum to a string before sending
}

app.get("/page", handleFirstRequest);

function started() {
  console.log("test is listening on localhost:", port);
}

app.listen(port, started);
