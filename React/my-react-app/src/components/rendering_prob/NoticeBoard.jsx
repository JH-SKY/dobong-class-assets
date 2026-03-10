import React from "react";

const NoticeBoard = ({
  hasNewMessage = true,
  isMember = true,
  errorMessage = "",
}) => {
  return (
    <div className="card">
      <div>NoticeBoard</div>
      <p>{hasNewMessage && "새 메시지가 있음!"}</p>
      <p>{isMember && "회원 전용 컨텐츠"}</p>
      <p>{errorMessage.length !== 0 && errorMessage}</p>
      <p>{errorMessage}</p>
    </div>
  );
};

export default NoticeBoard;
