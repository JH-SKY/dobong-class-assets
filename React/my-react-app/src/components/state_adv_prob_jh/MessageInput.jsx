import React, { useState } from "react";

const MessageInput = ({ messages, setMessages }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  const handelEnter = (e) => {
    {
      if (e.key === "Enter") handleSubmit();
    }
  };
  return (
    <div>
      <input
        className="input"
        type="text"
        value={input}
        placeholder="메세지를 입력하세요"
        onChange={handleChange}
        onKeyDown={handelEnter}
      />
      <button className="button" onClick={handleSubmit}>
        제출
      </button>
    </div>
  );
};

export default MessageInput;
