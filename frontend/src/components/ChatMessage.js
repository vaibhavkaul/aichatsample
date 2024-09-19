import React from "react";
import "./ChatMessage.css";

function parseBoldText(text) {
  const boldTextRegex = /\*\*(.*?)\*\*/g;
  const bolded = text.replace(boldTextRegex, "<strong>$1</strong>");
  return bolded.replace(/\n/g, "<br />");
}

const ChatMessage = ({ sender, text }) => {
  const parsedText = parseBoldText(text);

  return (
    <div className={`message ${sender === "user" ? "user" : "bot"}`}>
      {text === "..." ? (
        <div className="typing-indicator">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : (
        <div className="message-content">
          <p dangerouslySetInnerHTML={{ __html: parsedText }}></p>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
