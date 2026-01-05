import { useState, useEffect, useRef } from "react";
import gif from "./assets/giff.gif";
import "./live.css";

const Live = () => {
  const [voices, setVoices] = useState([]);
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [gifSize, setGifSize] = useState(300); // initial size in px

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length) setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported!");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setListening(true);
      console.log("Listening started");
    };

    recognition.onend = () => {
      if (!aiSpeaking) {
        console.log("Restarting recognition...");
        recognition.start();
      }
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      if (!transcript) return;

      console.log("User said:", transcript);
      setGifSize(250); // shrink GIF
      setListening(false);

      try {
        const res = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript })
        });
        const data = await res.json();
        speakAI(data.reply);
      } catch (err) {
        console.error(err);
        // restore GIF if AI fails
        setGifSize(300);
        setListening(true);
      }
    };

    recognitionRef.current = recognition;

    // We DO NOT start recognition here automatically. Must be triggered by user
  }, [voices, aiSpeaking]);

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.start();
    }
  };

  const speakAI = (text) => {
    if (!("speechSynthesis" in window) || !voices.length) return;

    const utterance = new SpeechSynthesisUtterance(text);

    // pick a pretty female English voice
    const prettyVoice =
      voices.find(
        (v) =>
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("kendra") ||
          (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
      ) || voices[0];

    utterance.voice = prettyVoice;
    utterance.rate = 0.99;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setAiSpeaking(true);
      console.log("AI started speaking...");
    };
    utterance.onend = () => {
      setAiSpeaking(false);
      setGifSize(300); // expand GIF back
      setListening(true);
      console.log("AI finished speaking");
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="live-container">
      <img
        src={gif}
        alt="Live GIF"
        className={`live-gif ${aiSpeaking ? "expanded" : listening ? "normal" : "shrunk"}`}
        style={{ width: gifSize, height: gifSize }}
      />
      {!listening && !aiSpeaking && (
        <button onClick={startListening} className="start-btn">
          Start Listening
        </button>
      )}
    </div>
  );
};

export default Live;
