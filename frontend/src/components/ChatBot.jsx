import { useState } from 'react';
import { chatWithBot } from '../api/Pet';
import MorphingText from './MorphingText';
import PetQuestions from './PetQuestions';

const ChatBot = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage = { sender: 'user', text: query };
        setMessages([...messages, userMessage]);
        setQuery('');

        try {
            const res = await chatWithBot(query);
            setMessages(prev => [...prev, { sender: 'bot', text: res.data.reply }]);
        } catch {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
        }
    };

    return (
        <div className="chat-container">
            <MorphingText />

            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask me about pets..."
                    className="chat-input"
                />
                <button type="submit" className="chat-button">&gt;</button>
            </form>

            <PetQuestions setQuery={setQuery} />

            {messages.length > 0 && (
  <div className="chat-box">
    {messages.map((msg, i) => (
      <div key={i} className={`chat-message ${msg.sender}`}>
        {msg.sender === 'user' ? (
          <p><strong>You:</strong> {msg.text}</p>
        ) : (
          <ul>
            {msg.text
              // Remove *, #, and other markdown symbols
              .replace(/[*#]/g, '')
              // Split by newlines
              .split('\n')
              // Remove empty lines
              .filter(line => line.trim() !== '')
              .map((point, idx) => (
                <li key={idx}>{point.trim()}</li>
              ))}
          </ul>
        )}
      </div>
    ))}
  </div>
)}

        </div>
    );
};

export default ChatBot;
