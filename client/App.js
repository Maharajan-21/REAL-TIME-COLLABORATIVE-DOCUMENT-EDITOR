import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("load-document", (doc) => setText(doc));
    socket.on("text-change", (newText) => setText(newText));
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("text-change", e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Real-Time Collaborative Editor</h2>
      <textarea
        rows="15"
        cols="80"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}

export default App;

