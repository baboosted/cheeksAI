import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const LandingPage = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const userMessage = { role: 'user', content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a witty and cheeky AI assitant. You respond with humor, sarcasm, and light-hearted insults while ensuring users still get the help they need.' },
          ...messages,
          userMessage,
        ],
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'system', content: 'Sorry, there was an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1>Welcome to CheeksAI</h1>
        <p>Chat with our advanced AI assistant to explore endless possibilities.</p>
        <button className="cta-button" onClick={() => window.scrollTo({ top: document.getElementById('chatbox-section').offsetTop, behavior: 'smooth' })}>Get Started</button>
      </header>

      <section id="chatbox-section" className="chatbox-section">
        <div className="chatbox">
          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <p>{message.content}</p>
              </div>
            ))}
            {isLoading && <div className="loading-indicator">Thinking...</div>}
          </div>

          <div className="input-area">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type a message..."
              className="input-field"
            />
            <button onClick={handleSendMessage} className="send-button">Send</button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 CheeksAI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
