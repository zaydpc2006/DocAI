
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './Chat';
import Live from "./Live";
import { useState } from 'react'
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/live" element={<Live />} />
      </Routes>
    </Router>
  );
}

export default App;
