import React from "react";
import MessageInput from "./MessageInput";
import MessageDisplay from "./MessageDisplay";
import { useState } from "react";

const MessageContainer = () => {
  const [message, setMessage] = useState("");

  // 컨테이너에서 쓸 state랑
  // 컴포넌트에서 쓸 state 분리.
  const [message2, setMessage2] = useState("");

  return (
    <div className="card">
      <div>MessageContainer</div>
      <div className="card">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          className="input"
        />
        <div>{message}</div>
      </div>
      <div className="card">
        {/* <input
          onChange={(e) => setMessage2(e.target.value)}
          type="text"
          className="input"
        />  => meesageInput
        */}
        {/* <div>{message2}</div> => MessageDisplay*/}
      </div>
      <MessageInput meesage={message2} setMessage={setMessage2} />
      <MessageDisplay message={message2} />
    </div>
  );
};

export default MessageContainer;
