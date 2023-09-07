import React, { useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080");

export const App = () => {
  const [response, setResponse] = useState([]);
  const [typing, setTyping] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;

    // Sunucuya mesajı iletiyoruz
    socket.emit("api/room", message);

    // Mesajı yanıt listesine ekliyoruz
    setResponse([...response, "Sizden giden mesaj => " + message]);

    e.target.message.value = "";
  };

  const handleChange = (e) => {
    // Typing olayını iletiyoruz
    socket.emit("typing", "yazıyor...");
  };

  socket.on("second/room", (data) => {
    // Gelen mesajları yanıt listesine ekliyoruz
    setResponse([...response, data]);
  });

  socket.on("typing", (data) => {
    setTyping(data);
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          id="message"
          autoComplete="off"
          onChange={handleChange}
        />
        <button type="submit">send</button>
      </form>

      <p>{typing}</p>

      <ol>
        {response.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    </div>
  );
};
