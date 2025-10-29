import React, { useState, useRef, useEffect } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const threadId =
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

 const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3001"
    : import.meta.env.VITE_API_BASE_URL;

console.log("🧠 Using API Base URL:", BASE_URL);

const isProductionMissingUrl =
  import.meta.env.MODE !== "development" && !import.meta.env.VITE_API_BASE_URL;


const callServer = async (inputText) => {
  const response = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ threadId, message: inputText }),
  });

  if (!response.ok) throw new Error("Error generating the response.");
  const result = await response.json();
  return result.message;
};

  const generate = async (text) => {
    if (isProductionMissingUrl) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          content:
            "Deployment error: VITE_API_BASE_URL not set. Contact the site owner or rebuild with the API URL.",
        },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const assistantMessage = await callServer(text);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantMessage },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "system", content: "❌ Error generating response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = () => {
    if (input.trim()) generate(input.trim());
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter" && input.trim()) generate(input.trim());
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-neutral-900 to-black text-white">
      {/* Header */}
      <div className="p-4 text-center text-xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
        💬 VChatGPT
      </div>

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-neutral-700"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl text-sm shadow-lg backdrop-blur-md transition-all duration-200 ${
                msg.role === "user"
                  ? "bg-blue-600/80 text-white max-w-[80%]"
                  : msg.role === "assistant"
                  ? "bg-white/10 text-gray-100 max-w-[80%]"
                  : "bg-red-600/70 text-white max-w-[80%]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-400 text-center animate-pulse">
            Thinking...
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-4 border-t border-neutral-800 bg-neutral-950/70 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-xl bg-neutral-800/60 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <button
            onClick={handleAsk}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all font-medium"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
