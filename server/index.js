const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected " + socket.id);
  socket.on("sendDataClient", function (data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    console.log("data:::", data);
    // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server,
    // socket.emit("sendDataServer", data);
    //lệnh emit trên này phát cả lại cho máy gửi lên, ví dụ moojtnguowif gửi tin nhắn thì họ cũng sẽ nhận được tin nhắn đó
    //lệnh broadcast này thì sẽ gửi cho tất cả các người khác ngoại trừ người gửi
    socket.broadcast.emit("sendDataServer", data);
  });
});
server.listen(3001, () => {
  console.log("server is running in port 3001");
});
