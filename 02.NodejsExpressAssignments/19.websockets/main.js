const { Console } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    socket.on('chat message', (msg)=>{
        console.log(msg);
        io.emit("chat message",msg)
    })
  console.log(socket.id, " a user connected");

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnect");
  });
});

server.listen(3000, "192.168.29.52", () => {
  console.log("listening on *:3000");
});
