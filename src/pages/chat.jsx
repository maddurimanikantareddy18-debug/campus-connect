import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

function ChatPage() {

  const { group } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };

  // 🔥 REAL-TIME LISTENER
  useEffect(() => {
    const q = query(
      collection(db, "groups", group, "messages"),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, [group]);

  // 🔥 SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim()) return;

    await addDoc(collection(db, "groups", group, "messages"), {
      text: input,
      sender: user.name,
      createdAt: new Date()
    });

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-green-600 text-white p-4 flex justify-between">
        <button onClick={() => navigate(-1)}>⬅ Back</button>
        <h2 className="font-bold">{group}</h2>
        <span>⋮</span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-4 overflow-y-auto">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 flex ${
              msg.sender === user.name ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === user.name
                  ? "bg-green-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              <p className="text-xs font-bold">{msg.sender}</p>
              {msg.text}
            </div>
          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="p-3 bg-white flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default ChatPage;