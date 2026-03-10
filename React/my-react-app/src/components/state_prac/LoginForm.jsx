import React, { useState } from "react";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const handleLogin = () => {
    // 2. alert으로 보여주기
    alert(`아이디: ${id}\n비밀번호: ${pw}`);

    // 3. input 초기화 (상태를 빈 값으로!)
    setId("");
    setPw("");
  };
  return (
    <div className='card' style={{ padding: '20px' }}>
      {/* 4. input과 상태 연결 (value와 onChange) */}
      <input 
        type="text" 
        placeholder="아이디" 
        value={id}
        onChange={(e) => setId(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={pw}
        onChange={(e) => setPw(e.target.value)} 
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
};

export default LoginForm;
