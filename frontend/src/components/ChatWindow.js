import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatService from "../services/ChatAPIService";
import SidePanel from "./SidePanel";
import "./ChatWindow.css";
import { SendIcon } from "./SendIcon";
import { Menu } from "lucide-react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi this is a basic chat bot talking to you using python backend",
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const maxMessages = 4;

  const endOfMessagesRef = useRef(null);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "..." },
      ]);

      try {
        const lastMessages = messages.slice(-maxMessages);
        const data = await ChatService.fetchChatResponse(input, lastMessages);

        setMessages((prevMessages) => {
          const newMessages = prevMessages.slice(0, -1); // Remove typing indicator
          return [...newMessages, { sender: "bot", text: data.answer }];
        });
      } catch (error) {
        setError("Error occurred while fetching response");
        setTimeout(() => {
          setError("");
          setMessages((prevMessages) => {
            const newMessages = prevMessages.slice(0, -1);
            return [...newMessages];
          });
        }, 1000);
      }
    }
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="chat-window" ref={chatWindowRef}>
      <SidePanel isOpen={isPanelOpen} togglePanel={togglePanel} />
      <div className={`chat-content ${isPanelOpen ? "shifted" : ""}`}>
        <div className="chat-header">
          <button className="header-button" onClick={togglePanel}>
            <Menu size={28} />
          </button>
        </div>
        <div className="messages">
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} text={msg.text} />
          ))}
          <div ref={endOfMessagesRef} />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="input-area">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-button" onClick={handleSend}>
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
