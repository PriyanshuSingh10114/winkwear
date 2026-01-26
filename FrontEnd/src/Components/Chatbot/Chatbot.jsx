import React, { useState, useRef, useEffect } from 'react';
import botAvatar from "../Assets/chatbot-avatar.webp";
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Winkie, your WinkWear assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('http://localhost:4000/api/chatbot/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await response.json();
            if (data.success) {
                setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
            } else {
                setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { text: "Error: Could not reach the server.", sender: 'bot' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <div className="header-info">
                            <div className="bot-avatar">
                                <img src={botAvatar} alt="Winkie Assistant" />
                            </div>

                            <div>
                                <h3>Winkie</h3>
                                <p>Online</p>
                            </div>
                        </div>
                        <button className="close-chat" onClick={() => setIsOpen(false)}>
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator message bot">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Ask Winkie anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="send-btn" onClick={handleSend} aria-label="Send message">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                <img src={botAvatar} alt="Winkie AI" />
            </button>
        </div>
    );
};

export default Chatbot;
