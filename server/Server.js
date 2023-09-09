const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// İstemci bağlandığında
io.on("connection", (socket) => {
  console.log("Yeni istemci bağlandı");

  // İstemciden gelen mesajı dinle
  socket.on("api/room", (data) => {
    const gData = JSON.parse(data);

    if (gData.forwho === 2) {
      // Diğer istemciye mesajı iletiyoruz
      io.emit("second/room", "İkinci istemciye gelen mesaj => " + data);
    }
  });

  // İstemciden gelen mesajı dinle
  socket.on("api/room", (data) => {
    console.log("Alınan mesaj: " + data);

    // Diğer istemciye mesajı iletiyoruz
    io.emit("second/room", "İkinci istemciye gelen mesaj => " + data);
  });

  let typingTimer;

  socket.on("typing", () => {
    clearTimeout(typingTimer);
    socket.broadcast.emit("typing", "typing...");
    typingTimer = setTimeout(() => {
      socket.broadcast.emit("typing", "");
    }, 1000);
  });
});

server.listen(port, () => console.log(`Sunucu ${port} portunda başlatıldı`));
