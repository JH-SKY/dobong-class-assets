import React from "react";

const MessageDisplay = ({ message }) => {
  return (
    <div className="card">
      <div>MessageDisplay</div>
      <div>{message}</div>
    </div>
  );
};

export default MessageDisplay;
