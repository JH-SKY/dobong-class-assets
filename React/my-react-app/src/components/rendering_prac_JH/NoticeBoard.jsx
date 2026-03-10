import React from "react";

const NoticeBoard = () => {
  const hasNewMessage = true;
  const ismember = true;
  const errormessage = "긴급경보!!!!!!!!!";
  return (
    <div>
      {hasNewMessage && <p>새 메시지가 있습니다.</p>}
      {ismember && <p>회원 전용 콘텐츠</p>}
      {errormessage && <p>{errormessage}</p>}
    </div>
  );
};

export default NoticeBoard;
