const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
const server = http.createServer(app);
const PORT = 3001;

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("USER CONNECTED :", socket.id);

  socket.on("join_room",(data)=>{
    socket.join(data);
    console.log(`user with id ${socket.id} joined the room ${data}`);
  })

  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("recieve_message",data);
  })

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
