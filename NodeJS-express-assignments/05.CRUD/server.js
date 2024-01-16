const express = require("express");
const app = express();
port = 3000;
var booksInfo=[
    {   id:1,
        title:"whisper",
        author: "kinley",
    },

]
function senddata(req, res) {
    

   res.json(booksInfo);
}
function receivedata(req,res){
     const author = req.query.author;
  const title = req.query.title;
     id = booksInfo.length + 1;
     const newBook = {
       id: booksInfo.length + 1,
       title: title,
       author: author,
     };
     booksInfo.push(newBook);
       console.log(newBook);
    res.send("updated data")
    

}
function updatedata(req,res){
    const id=req.query.id;
     const author = req.query.author;
     const title = req.query.title;

     booksInfo[id-1]["title"] =title;
     booksInfo[id-1]["author"] = author;
     res.send("updated"+title+author);



};

app.get("/", senddata);
app.post("/",receivedata)
// app.delete("/", deletedata);
app.put("/",updatedata)
function serverReady() {
  console.log("The server is ready at http://localhost:3000/");
}
app.listen(port, serverReady);
