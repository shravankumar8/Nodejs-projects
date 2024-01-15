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
    function mul(counter) {
      total = 0;
      for (var i = 0; i < counter.length; i++) {
        total = total * i;
      }
      return total;
    }
    function handleFirstRequest(req, res) {
      counter = req.body.counter;

      var calculatedsum = calculate(counter);
      var calculatedMul = mul(counter);
      console.log(calculatedMul);
      answerObject = {
        counter: calculatedsum,
        something: 34545,
      };
      res.send(answerObject);
    }

    obj={
      shrvan:"kumar",
      age:19,
    }
    obj1 = JSON.stringify(obj)
    html = `<head>
        
        <title>Document</title>
    </head>
    <body>
        <p>this is example text</p>
        <p>this is example text</p>
        <p>this is example text</p>
        <p>this is example text</p>
    </body>`;
    function givePage(req, res) {
      res.sendFile(__dirname+"/index.html")
    }
    app.post("/", handleFirstRequest);
    app.get("/page", givePage);
    function started() {
      console.log("test is listening on localhost:", port);
    }
    app.listen(port, started);
