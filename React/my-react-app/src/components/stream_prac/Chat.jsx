import { useState } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setAnswer("");
    setLoading(true);

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

          setAnswer((prev) => prev + data);
        }
      }
    }

    setLoading(false);
  };

  // 참고: for문의 break는 for문만 탈출한다 (while문은 계속 진행)
  // 서버가 [DONE] 이후 스트림을 닫으면 done이 true가 되어 while문도 끝난다

  return (
    <div>
      <h2>AI 챗봇</h2>
      <div className="border border-gray-300 p-4 min-h-[100px] mb-4 whitespace-pre-wrap">
        {answer || (loading ? "응답 대기 중..." : "질문을 입력하세요")}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="메시지를 입력하세요"
        disabled={loading}
      />
      <button onClick={handleSend} disabled={loading}>
        전송
      </button>
    </div>
  );
};

export default Chat;
