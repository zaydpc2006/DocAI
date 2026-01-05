import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 

import "./chat.css";
import logo from "./assets/logodoc.png";

const MedicalChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);

   const navigate = useNavigate();
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length) setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); 
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported!");
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);
//mh---------------------------------------------------------------------------------------------------------------------------
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Server error." }
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const speakMessage = (text) => {
    if (!("speechSynthesis" in window)) return alert("Speech not supported!");
    if (!voices.length) return;

    const utterance = new SpeechSynthesisUtterance(text);

    const prettyVoice = voices.find(
      v =>
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("kendra") ||
        (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
    ) || voices[0];

    utterance.voice = prettyVoice;
    utterance.rate = 0.85;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  };
//ZA---------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>
        <div className="chat-profile">
          <div className="profile-icon">👤</div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty">
            Ask me any medical question. I'm here to help!
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message-wrapper ${msg.role}`}>
              <div className={`message ${msg.role}`}>
                {msg.text}
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speakMessage(msg.text)}
                    className="speech-btn"
                    title="Read aloud"
                  >
                    🔊
                  </button>
                )}
              </div>
            </div>
          ))
        )}
        {loading && <div className="chat-loading">Thinking...</div>}
      </div>

      <div className="chat-input-wrapper">
        <div className="chat-input-container">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="How do you feel..."
            disabled={loading}
            className="chat-input"
          />
          <button
            onClick={toggleListening}
            className={`chat-voice-btn ${listening ? "listening" : ""}`}
            title="Record voice"
          >
            {listening ? "🎙️ Listening..." : "🎤"}
          </button>
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="chat-send-btn"
          >
            ↑
          </button>
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button
            className="chat-live-btn"
            onClick={() => navigate("/live")} // navigate to Live page
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#1e90ff",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Go Live 🎥
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalChat;
