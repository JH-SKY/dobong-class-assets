import { useState } from "react";

const ChatHistory = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // AI 응답을 빈 문자열로 먼저 추가한다
    setMessages((prev) => [...prev, { role: "ai", content: "" }]);

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      const lines = text.split("\n");

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;

          setMessages((prev) =>
            prev.map((msg, i) =>
              i === prev.length - 1
                ? { ...msg, content: msg.content + data }
                : msg,
            ),
          );
        }
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>AI 챗봇</h2>
      <div className="border border-gray-300 p-4 min-h-[200px] mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <strong>{msg.role === "user" ? "나" : "AI"}</strong>
            <p className="whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.content === "" && (
          <p>응답 대기 중...</p>
        )}
      </div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="메시지를 입력하세요"
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatHistory;
