const express = require("express");
const app = express();
const port = 3000;

const booksInfo = [{ id: 1, title: "Whisper", author: "Kinley" }];

app.get("/books", (req, res) => {
  res.json(booksInfo);
});

app.post("/books", (req, res) => {
  const name = req.query.name;
  const title = req.query.title;

  const newBook = {
    id: booksInfo.length + 1,
    title: title,
    author: name,
  };

  booksInfo.push(newBook);

  console.log(newBook);
  res.send("Updated data");
});

function serverReady() {
  console.log(`The server is ready at http://localhost:${port}/`);
}

app.listen(port, serverReady);
