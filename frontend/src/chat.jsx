import React from "react";
import { useState, useRef } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  // unique threadId (same as tere code me)
  const threadId =
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

  const callServer = async (inputText) => {
    const response = await fetch("http://localhost:3001/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ threadId, message: inputText }),
    });

    if (!response.ok) {
      throw new Error("Error generating the response.");
    }

    const result = await response.json();
    return result.message;
  };

  const generate = async (text) => {
    // 1. append user message
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    // 2. call server
    try {
      const assistantMessage = await callServer(text);

      // 3. append assistant message
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
    if (input.trim() === "") return;
    generate(input.trim());
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && input.trim()) {
      generate(input.trim());
    }
  };

  // auto-scroll to bottom when new message arrives
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // run scroll when messages update
  React.useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen p-4 bg-neutral-900 text-white">
      {/* Chat container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto space-y-4"
        id="chat-container"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-fit ${
              msg.role === "user"
                ? "ml-auto bg-neutral-800"
                : msg.role === "assistant"
                ? "bg-neutral-700"
                : "bg-red-600"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="my-6 animate-pulse text-gray-400">Thinking...</div>
        )}
      </div>

      {/* Input + Button */}
      <div className="mt-4 flex gap-2">
        <input
          id="input"
          type="text"
          className="flex-1 p-2 rounded bg-neutral-800 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <button
          id="ask"
          onClick={handleAsk}
          className="px-4 py-2 bg-blue-600 rounded"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
