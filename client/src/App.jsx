import React, { useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:8080");

export const App = () => {
  const [response, setResponse] = useState([]);
  const [typing, setTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    // socket.emit("message", message);
    socket.emit("/api/room", message);
    e.target.message.value = "";
  };

  socket.on("/api/room", (data) => {
    setResponse([...response, data]);
  });

  const handleChange = (e) => {
    socket.emit("/typing", "yozyabdi");
  };

  socket.on("/typing", (data) => setTyping(data));

  console.log(typing);

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
        <button type="submit">Yuborish</button>
      </form>

      <ol>
        {response.reverse().map((item, index) => {
          return (
            <li key={index}>
              {response.length - index} {item}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
