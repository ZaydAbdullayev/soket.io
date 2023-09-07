const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Soket.IO ni sozlash
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("/api/room", (data) => {
    console.log("Message received: " + data);

    // xabarni boshqa foydalanuvchilarga yuborish
    socket.emit("/api/room", "Beckendga kelgan xabar => " + data);
  });

  socket.on("/typing", (data) => {
    // Tuyping bo'lganini boshqa foydalanuvchilarga yuborish
    socket.emit("/typing", "typing...");
  });
});

server.listen(port, () => console.log(`Server started on port: ${port}`));
