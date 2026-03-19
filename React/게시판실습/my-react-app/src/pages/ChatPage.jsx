import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";

const ChatPage = () => {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]); // 현재 대화 내용
  const [conversations, setConversations] = useState([]); // [추가] 왼쪽 사이드바 목록
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();
  const navigate = useNavigate();

  // 1. [동작: 목록 가져오기] 페이지 접속하자마자 대화 리스트를 쫙 불러옵니다.
  const fetchConversations = async () => {
    try {
      const res = await api.get("/conversations");
      setConversations(res.data);
    } catch (err) {
      console.error("목록 불러오기 실패", err);
    }
  };

  // 2. [동작: 기존 대화 불러오기] 현재 방의 이전 대화 내역을 DB에서 가져옵니다.
  const fetchMessages = async () => {
    try {
      const res = await api.get(`/conversations/${conversationId}/messages`);
      setMessages(res.data);
    } catch (err) {
      console.error("메시지 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchConversations();
    if (conversationId) fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. [동작: 전송 및 저장] 메시지를 보내면 서버가 자동으로 DB에 저장하도록 설계됨
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI 답변용 빈 그릇 추가
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      // [메커니즘]: fetch를 통해 스트리밍을 받으면서 서버 DB에 자동 저장 요청
      const response = await fetch(`http://localhost:8000/conversations/${conversationId}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        
        lines.forEach(line => {
          if (line.startsWith("data: ")) {
            const content = line.replace("data: ", "");
            if (content !== "[DONE]") {
              accumulatedResponse += content;
              setMessages((prev) => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1].content = accumulatedResponse;
                return newMsgs;
              });
            }
          }
        });
      }
      // 대화가 끝난 후 목록을 새로고침해서 제목 업데이트 반영
      fetchConversations();
    } catch (error) {
      alert("연결 오류 발생");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={pageWrapperStyle}>
      {/* [왼쪽 사이드바] */}
      <aside style={sidebarStyle}>
        <button onClick={() => navigate("/")} style={homeBtnStyle}>🏠 홈으로</button>
        <div style={listContainerStyle}>
          <h3 style={{ color: "#888", fontSize: "12px", padding: "0 10px" }}>최근 대화 목록</h3>
          {conversations.map((conv) => (
            <Link 
              key={conv.id} 
              to={`/chat/${conv.id}`} 
              style={{...navLinkStyle, backgroundColor: conv.id == conversationId ? "#eef6ff" : "transparent"}}
            >
              # {conv.title || `대화 ${conv.id}`}
            </Link>
          ))}
        </div>
      </aside>

      {/* [오른쪽 채팅 영역] */}
      <div style={mainChatStyle}>
        <header style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: "18px" }}>🤖 AI 상담원</h2>
        </header>

        <div style={chatBoxStyle}>
          {messages.map((msg, index) => (
            <div key={index} style={msg.role === "user" ? myWrapper : aiWrapper}>
              <div style={msg.role === "user" ? myBox : aiBox}>{msg.content}</div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form onSubmit={handleSend} style={inputAreaStyle}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AI에게 궁금한 점을 물어보세요..."
            style={inputFieldStyle}
            disabled={isTyping}
          />
          <button type="submit" style={sendBtnStyle}>전송</button>
        </form>
      </div>
    </div>
  );
};

// --- 스타일 (레이아웃 버그 수정 핵심) ---
const pageWrapperStyle = { 
  display: "flex", 
  position: "fixed",      // 1. 화면에 딱 박아버리기
  top: "70px",            // 2. 헤더 높이(70px)만큼 아래서 시작!
  left: 0,
  right: 0,
  bottom: 0,              // 3. 바닥까지 꽉 채우기
  overflow: "hidden",
  backgroundColor: "#fff" 
};
const sidebarStyle = { width: "260px", backgroundColor: "#fff", borderRight: "1px solid #eee", display: "flex", flexDirection: "column" };
const homeBtnStyle = { margin: "20px", padding: "10px", border: "1px solid #ddd", borderRadius: "8px", background: "#fff", cursor: "pointer" };
const listContainerStyle = { flex: 1, overflowY: "auto", padding: "0 10px" };
const navLinkStyle = { display: "block", padding: "12px", textDecoration: "none", color: "#333", borderRadius: "8px", marginBottom: "5px", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };

const mainChatStyle = { flex: 1, display: "flex", flexDirection: "column", backgroundColor: "#f9f9f9" };
const headerStyle = { padding: "15px 25px", backgroundColor: "#fff", borderBottom: "1px solid #eee" };
const chatBoxStyle = { flex: 1, overflowY: "auto", padding: "25px", display: "flex", flexDirection: "column", gap: "15px" };

const myWrapper = { display: "flex", justifyContent: "flex-end" };
const aiWrapper = { display: "flex", justifyContent: "flex-start" };
const myBox = { padding: "12px 16px", backgroundColor: "#007bff", color: "#fff", borderRadius: "15px 15px 0 15px", maxWidth: "70%" };
const aiBox = { padding: "12px 16px", backgroundColor: "#fff", border: "1px solid #eee", borderRadius: "15px 15px 15px 0", maxWidth: "70%" };

const inputAreaStyle = { padding: "20px", backgroundColor: "#fff", display: "flex", gap: "10px" };
const inputFieldStyle = { flex: 1, padding: "12px 20px", borderRadius: "25px", border: "1px solid #ddd", outline: "none" };
const sendBtnStyle = { padding: "10px 25px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "25px", cursor: "pointer" };

export default ChatPage;