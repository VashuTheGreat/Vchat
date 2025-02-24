

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import bg from './assets/bg-img.jpg';
import send from './assets/send.gif';
import { v4 as uuidv4 } from "uuid";

const socket = io('https://vchat-9fmj.onrender.com/');

function App() {
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [roomId, setRoomId] = useState(""); 
  const [joined, setJoined] = useState(false);

  const createRoom = () => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
    socket.emit("joinRoom", newRoomId);
    setJoined(true);
  };

  const joinRoom = () => {
    if (roomId.trim() !== "") {
      socket.emit("joinRoom", roomId);
      setJoined(true);
    }
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      setAllMessages((prev) => [...prev, { text: msg, sender: 'other' }]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      setAllMessages((prev) => [...prev, { text: message, sender: 'me' }]);
      socket.emit("message", { roomId, message });
      setMessage('');
    }
  };

  return (
    <div
      className="main w-full h-screen flex flex-col relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {!joined ? (
        <div className="flex flex-col items-center justify-center h-full">
          <button 
            onClick={createRoom} 
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
          >
            Create Private Room
          </button>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border px-4 py-2 mb-2"
          />
          <button 
            onClick={joinRoom} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Join Room
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-center text-white py-2">Room ID: {roomId}</h3>
          <ul className="flex-1 overflow-y-auto p-4">
            {allMessages.map((msg, index) => (
              <li key={index} className={`flex w-full mt-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg max-w-[60%] ${msg.sender === 'me' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                  {msg.text}
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 left-0 w-full bg-[#202c33] flex p-2">
            <input
              className="w-full h-[50px] bg-[#2A3942] text-white px-4 text-lg rounded-l-md outline-none"
              type="text"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-6 text-lg rounded-r-md hover:bg-blue-600"
            >
              <img src={send} alt="send" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
