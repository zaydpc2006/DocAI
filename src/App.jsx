
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './Chat';
import Live from "./Live";
import { useState } from 'react'
import './App.css'
import LoginLayout from "./LoginLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
        <Route path="/live" element={<Live />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
