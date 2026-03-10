import React, { useState } from 'react';

const PasswordCheck = () => {
  // [설계 의도] 
  // 사용자가 비밀번호를 두 번 입력할 때 오타가 없는지 실시간으로 대조하기 위해 
  // 두 개의 '상태(State)'와 이를 비교한 '판단 변수'를 만들었어요.

  // 1. 준비물 챙기기 (데이터 저장소)
  const [password, setPassword] = useState(""); // 첫 번째 비밀번호 보관함(출입증 설정)
  const [confirmPassword, setConfirmPassword] = useState(""); // 두 번째 확인용 보관함

  // 2. 비유 사용하기 (개념 연결)
  // isMatch는 '두 출입증이 똑같은지 확인하는 검사기'예요.
  const isMatch = password === confirmPassword; 
  // isNotEmpty는 '두 칸에 다 내용물이 들어있는지 확인하는 전원 스위치'예요.
  const isNotEmpty = password !== "" && confirmPassword !== "";

  // 3. 흐름 파악하기 (스타일 설정)
  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  return (
    <div className='card' style={{ padding: '20px', maxWidth: '300px', border: '1px solid #eee' }}>
      <h3>비밀번호 보안 설정</h3>
      
      {/* 1. 첫 번째 비밀번호 입력칸 */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>비밀번호</label>
        <input 
          type="password" // 보안을 위해 글자를 '점'으로 가려주는 출입보안 모드!
          placeholder="비밀번호 입력" 
          value={password}
          style={inputStyle} 
          onChange={(e) => setPassword(e.target.value)} // 칠 때마다 즉시 보관함에 넣기
        />
      </div>

      {/* 2. 두 번째 비밀번호 확인칸 */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontSize: '14px', fontWeight: 'bold' }}>비밀번호 확인</label>
        <input 
          type="password" 
          placeholder="한 번 더 입력해주세요" 
          value={confirmPassword}
          style={inputStyle}
          onChange={(e) => setConfirmPassword(e.target.value)} // 얘도 실시간으로 대조 보관함에 넣기
        />
      </div>

      {/* 3. 일 시키기 (결과 보여주기) */}
      {/* 전원 스위치(isNotEmpty)가 켜졌을 때만, 검사기 결과(isMatch)에 따라 메시지를 띄워요. */}
      {isNotEmpty && (
        <p style={{ 
          color: isMatch ? 'blue' : 'red', // 똑같으면 파랑(통과), 다르면 빨강(경고)!
          fontSize: '13px', 
          fontWeight: '500',
          marginTop: '5px' 
        }}>
          {isMatch ? "✅ 비밀번호가 일치합니다" : "❌ 비밀번호가 일치하지 않습니다"}
        </p>
      )}
    </div>
  );
};

export default PasswordCheck;