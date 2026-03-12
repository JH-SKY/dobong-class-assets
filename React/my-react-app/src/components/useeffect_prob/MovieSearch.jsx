import React, { useState } from "react";

const MovieSearch = ({ onSearch }) => {
  const [text, setText] = useState(""); // 내가 입력하는 글자 담는 그릇

  return (
    <div className="flex justify-center gap-2 mb-10">
      <input
        type="text"
        className="border-2 p-2 rounded-lg w-64"
        placeholder="영화 제목 입력..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button 
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        onClick={() => onSearch(text)} // 부모가 준 함수를 실행하며 내가 쓴 글자를 보냅니다.
      >
        검색
      </button>
    </div>
  );
};

export default MovieSearch;