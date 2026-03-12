import React from "react";

const MessageInput = ({ meesage, setMessage }) => {
  return (
    <div className="card">
      <div>MessageInput</div>
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        className="input"
        value={meesage}
      />
      <button onClick={() => setMessage("")} className="button">
        reset
      </button>
    </div>
  );
};

export default MessageInput;
