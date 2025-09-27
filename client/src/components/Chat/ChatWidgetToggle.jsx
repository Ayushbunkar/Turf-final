import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatWidgetToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I assist you with TurfTime today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((p) => [...p, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4500/api/chat", { message: input });
      setMessages((p) => [...p, { sender: "ai", text: res.data.reply }]);
    } catch {
      setMessages((p) => [...p, { sender: "ai", text: "Sorry, I'm having trouble responding rn." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const TypingAnimation = () => (
    <div className="flex gap-1 text-2xl font-bold text-green-800">
      {[0, 200, 400].map((d, i) => (
        <span
          key={i}
          className="animate-blink"
          style={{ animationDelay: `${d}ms` }}
        >
          .
        </span>
      ))}
      <style>{`
        @keyframes blink {
          0%,80%,100% {opacity:0}
          40% {opacity:1}
        }
        .animate-blink {
          animation: blink 1.4s infinite;
        }
      `}</style>
    </div>
  );

  return (
    <>
      {/* Btn */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
          title="Open chat"
          className="fixed right-5 bottom-5 w-14 h-14 rounded-full bg-green-700 hover:bg-green-600 text-white shadow-lg flex items-center justify-center text-2xl z-50"
        >
          💬
        </button>
      )}

      {/* Chat */}
      {isOpen && (
        <section className="fixed right-5 bottom-20 w-80 max-h-[80vh] min-h-[450px] flex flex-col bg-green-800 rounded-lg shadow-lg text-white z-50">
          <header className="flex justify-between items-center bg-green-900 rounded-t-lg px-4 py-4 font-bold text-xl border-b border-green-700">
            <h2>TurfTime Chat Support</h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              title="Close chat"
              className="text-white hover:text-green-300 font-bold text-2xl cursor-pointer"
            >
              &times;
            </button>
          </header>

          <main className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-green-300">
            {messages.map((m, i) => (
              <p
                key={i}
                className={`max-w-[75%] p-3 rounded-lg break-words whitespace-pre-wrap ${
                  m.sender === "user"
                    ? "bg-green-600 self-end text-white"
                    : "bg-green-300 text-green-900 self-start"
                }`}
              >
                {m.text}
              </p>
            ))}

            {loading && (
              <div className="self-start w-14 h-6 flex items-center justify-center bg-green-300 text-green-900 rounded-lg">
                <TypingAnimation />
              </div>
            )}
            <div ref={messagesEndRef} />
          </main>

          <footer className="border-t border-green-700 bg-green-700 px-4 py-4 flex flex-col gap-2 rounded-b-lg">
            <textarea
              rows={2}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="resize-none p-2 rounded text-green-900 font-sans w-full"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="w-full bg-green-800 hover:bg-green-600 rounded py-2 font-semibold transition-opacity disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </footer>
        </section>
      )}
    </>
  );
};

export default ChatWidgetToggle;