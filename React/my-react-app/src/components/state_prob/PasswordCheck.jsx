import React, { useState } from "react";

const PasswordCheck = () => {
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  return (
    <div className="card">
      <div>PasswordCheck</div>
      <input
        type="password"
        onChange={(e) => setPw(e.target.value)}
        className="input"
      />
      <input
        type="password"
        onChange={(e) => setPwConfirm(e.target.value)}
        className="input"
      />
      {(pw || pwConfirm) &&
        (pw === pwConfirm ? (
          <div>비밀번호가 일치합니다 </div>
        ) : (
          <div className="text-red-500">비밀번호가 일치하지 않습니다 </div>
        ))}
    </div>
  );
};

export default PasswordCheck;
