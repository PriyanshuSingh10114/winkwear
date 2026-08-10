import React, { useState, useRef, useEffect } from "react";
import botAvatar from "../Assets/chatbot-avatar.webp";
import "./Chatbot.css";

const PROMPT_CHIPS = [
  "🔥 Summer Outfits",
  "👕 Men's Casual Wear",
  "👗 Women's Dresses",
  "🚚 Shipping & Delivery",
  "✨ Outfit Recommendations",
  "📏 Size Guide Helper",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm Winkie, your Wink & Wear AI Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSendText = async (textToSend) => {
    const message = textToSend.trim();

    if (!message || isTyping) return;

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        sender: "user",
      },
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BACKEND_URL}/api/chatbot/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          text:
            data?.success && data?.response
              ? data.response
              : "Sorry, I'm having trouble understanding that right now.",
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          text:
            "⚠️ Unable to connect to the assistant right now. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
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

            <button
              className="close-chat"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Messages */}
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

          {/* Quick Action Prompt Chips */}
          <div className="chatbot-chips-bar">
            {PROMPT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                className="chip-btn"
                onClick={() => handleSendText(chip)}
                disabled={isTyping}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask Winkie anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendText(input);
                }
              }}
            />

            <button
              className="send-btn"
              onClick={() => handleSendText(input)}
              disabled={isTyping}
              aria-label="Send message"
            >
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="currentColor"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Chatbot"
      >
        <img src={botAvatar} alt="Winkie AI" />
      </button>
    </div>
  );
};

export default Chatbot;