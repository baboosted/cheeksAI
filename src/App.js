import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Chatbox from "./ChatBox"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to the CheeksAi</h1>
      <p>Click below to start chatting with the AI:</p>
      <a href="/chatbox">
        <button>Go to Chatbox</button>
      </a>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chatbox" element={<Chatbox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
