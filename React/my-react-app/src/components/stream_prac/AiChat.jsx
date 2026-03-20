// src/pages/AiChatPage.jsx
import { useEffect, useRef, useState } from "react";
import api from "../../api";

const AiChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentConvId, setCurrentConvId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  // 대화방 목록 불러오기
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await api.get("/conversations");
      setConversations(res.data);
    };
    fetchConversations();
  }, []);

  // 대화방 선택 시 메시지 불러오기
  const selectConversation = async (convId) => {
    setCurrentConvId(convId);
    const res = await api.get(`/conversations/${convId}/messages`);
    setMessages(res.data);
  };

  // 새 대화방 만들기
  const createConversation = async () => {
    const res = await api.post("/conversations");
    setConversations((prev) => [res.data, ...prev]);
    setCurrentConvId(res.data.id);
    setMessages([]);
  };

  // 대화방 삭제
  const deleteConversation = async (convId) => {
    await api.delete(`/conversations/${convId}`);
    setConversations((prev) => prev.filter((c) => c.id !== convId));
    if (currentConvId === convId) {
      setCurrentConvId(null);
      setMessages([]);
    }
  };

  // 메시지 전송 + 스트리밍
  const handleSend = async () => {s
    if (!input.trim() || !currentConvId) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:8000/conversations/${currentConvId}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      },
    );

    if (!response.ok) {
      alert("메시지 전송에 실패했습니다.");
      setMessages((prev) => prev.slice(0, -1));
      setLoading(false);
      return;
    }

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

    // 첫 메시지면 대화방 제목 업데이트
    setConversations((prev) =>
      prev.map((c) =>
        c.id === currentConvId && c.title === "새 대화"
          ? { ...c, title: userMessage.content.slice(0, 30) }
          : c,
      ),
    );

    setLoading(false);
    inputRef.current.focus();
  };

  return (
    <div className="flex gap-4 h-[80vh]">
      {/* 사이드바 */}
      <div className="w-60 border-r border-gray-300 p-4 overflow-y-auto">
        <button onClick={createConversation} className="w-full mb-4">
          + 새 대화
        </button>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            className={`p-2 cursor-pointer flex justify-between items-center mb-1 ${
              conv.id === currentConvId ? "bg-gray-200" : ""
            }`}
          >
            <span onClick={() => selectConversation(conv.id)}>
              {conv.title}
            </span>
            <button
              onClick={() => deleteConversation(conv.id)}
              className="border-none cursor-pointer bg-transparent"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        <h2>AI 챗봇</h2>

        {!currentConvId ? (
          <p>대화를 선택하거나 새 대화를 만드세요.</p>
        ) : (
          <>
            <div className="flex-1 border border-gray-300 p-4 overflow-y-auto mb-4">
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
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="메시지를 입력하세요"
                disabled={loading}
                className="flex-1"
              />
              <button onClick={handleSend} disabled={loading}>
                전송
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AiChatPage;
