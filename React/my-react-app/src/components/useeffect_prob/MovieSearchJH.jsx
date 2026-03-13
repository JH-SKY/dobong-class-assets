import React, { useState } from "react";

const MovieSearch = ({ onSearch }) => {
  // 1. [입력창 그릇] 내가 지금 입력창에 타이핑하는 글자를 잠시 담아두는 곳이에요.
  const [input, setInput] = useState("");

  return (
    <div className="flex justify-center gap-2 mb-10">
      <input
        type="text"
        className="border-2 p-2 rounded-lg w-64"
        placeholder="영화 제목 입력..."
        value={input} // 글자 그릇과 입력창을 연결해요.
        onChange={(e) => setInput(e.target.value)} // 글자를 칠 때마다 input 그릇을 바꿔요.
      />

      {/* 2. [신호 보내기] 버튼을 누르면 부모가 준 onSearch 함수를 실행하며 내가 쓴 글자를 보냅니다. */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => {
          onSearch(input);
          setInput("");
        }}
      >
        검색
      </button>
    </div>
  );
};

export default MovieSearch;
