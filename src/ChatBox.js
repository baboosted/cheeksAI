import React, { useState } from 'react';
import axios from 'axios';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  
  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;
    
    // Append the user's message to the chat
    const userMessage = { role: 'user', content: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput('');

    try {
     
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',  // You can use gpt-4 or another model if available
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },  // Optional system message for context
          ...messages,  // Previous messages
          userMessage,  // Add the user's current message
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
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-window">
        {messages.map((message, index) => (
          <div key={index} className={message.role}>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;

