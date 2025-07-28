import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatWidgetToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you with TurfTime today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4500/api/chat", {
        message: input
      });

      setMessages(prev => [
        ...prev,
        { sender: "ai", text: response.data.reply }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "Sorry, I'm having trouble responding right now." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 left-5 bg-green-700 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          aria-label="Open chat support"
          title="Open chat support"
        >
          💬
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          className="fixed bottom-20 left-5 w-80 bg-green-800 text-white rounded-lg shadow-lg flex flex-col"
          style={{ minHeight: "450px", maxHeight: "80vh" }}
        >
          <div className="header bg-green-900 rounded-t-lg p-4 font-bold text-xl flex justify-between items-center">
            <span>TurfTime Chat Support</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-300 font-bold text-xl"
              aria-label="Close chat support"
              title="Close chat"
            >
              ×
            </button>
          </div>

          <div className="messages flex-grow overflow-y-auto p-4 space-y-3 scroll-smooth">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-3 rounded-lg break-words ${
                  msg.sender === "user"
                    ? "bg-green-600 self-end text-white"
                    : "bg-green-300 text-gray-900 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-green-300 text-gray-900 p-3 rounded-lg w-14 h-6 flex items-center justify-center self-start">
                <span className="typing-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="input-area p-4 border-t border-green-700">
            <textarea
              rows={2}
              placeholder="Type your message..."
              className="w-full p-2 rounded resize-none text-green-900"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="mt-2 w-full bg-green-700 hover:bg-green-600 rounded py-2 font-semibold transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>

          {/* Inline styles for typing animation */}
          <style>{`
            .typing-dots span {
              animation-name: blink;
              animation-duration: 1.4s;
              animation-iteration-count: infinite;
              animation-fill-mode: both;
              font-weight: bold;
              font-size: 22px;
              color: #065f46; /* darker green */
              margin-right: 3px;
            }
            .typing-dots span:nth-child(1) {
              animation-delay: 0s;
            }
            .typing-dots span:nth-child(2) {
              animation-delay: 0.2s;
            }
            .typing-dots span:nth-child(3) {
              animation-delay: 0.4s;
            }
            @keyframes blink {
              0%, 80%, 100% {
                opacity: 0;
              }
              40% {
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default ChatWidgetToggle;
