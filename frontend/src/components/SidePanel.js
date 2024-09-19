import React from "react";
import { X } from "lucide-react";
import "./SidePanel.css";

const SidePanel = ({ isOpen, togglePanel }) => {
  return (
    <div className={`side-panel ${isOpen ? "open" : ""}`}>
      <button className="close-panel" onClick={togglePanel}>
        <X size={24} />
      </button>
      <h3>What is this?</h3>
      <p>Basic chat app that can talk to an GPT backeng using python</p>
      <h3>What did you use to build this?</h3>
      <p>
        The front end is built in React using{" "}
        <a
          href="https://create-react-app.dev/"
          target="_blank"
          rel="noreferrer"
        >
          create-react-app
        </a>
        . The backend is Python{" "}
        <a
          href="https://fastapi.tiangolo.com/"
          target="_blank"
          rel="noreferrer"
        >
          FastAPI
        </a>
        . It is currently using{" "}
        <a href="https://platform.openai.com/" target="_blank" rel="noreferrer">
          OpenAI
        </a>{" "}
        to generate answers to questions being asked. However, I am using some
        stuff from{" "}
        <a href="https://llamahub.ai/" target="_blank" rel="noreferrer">
          LlamaHub
        </a>{" "}
        to both train the AI and create a contextual index for that chat itself.
        The whole thing is being served using a Docker machine (backend) on an
        EC2 machine with Nginx (frontend).
      </p>
    </div>
  );
};

export default SidePanel;
