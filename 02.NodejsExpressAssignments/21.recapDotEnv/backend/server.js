const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cors= require("cors")
app.use(cors())
let jokes = [
  {
    id: 1,
    title: "a joke",
    content: "this is a joke",
  },
  {
    id: 2,
    title: "this is second joke",
    content: "this is the descriptioon of the second joke",
  },
  {
    id: 3,
    title: "this is third joke",
    content: "this is the descriptioon of the third joke",
  },
  {
    id: 4,
    title: "this is  fourth joke",
    content: "this is the descriptioon of the fourth joke",
  },
  {
    id: 5,
    title: "this is fifth joke",
    content: "this is the descriptioon of the fifth joke",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>holla world !bonjour</h>");
});

app.get("/api/joke", (req, res) => {
  res.json(jokes);
});

app.listen(port, () => {
  console.log("app listening on post " + port);
});
