import React, { useState } from "react";
const MessageDisplay = ({ messages }) => {
  return (
    <div className="card" style={cardStyle}>
      {/* 제목과 목록 사이에 확실한 구분선을 줬습니다 */}
      <h3 style={titleStyle}>💬 메시지 목록</h3>

      <ul style={listStyle}>
        {messages.length === 0 ? (
          <li style={emptyStyle}>아직 받은 메시지가 없어요.</li>
        ) : (
          messages.map((msg, index) => (
            <li key={index} style={itemStyle}>
              <span style={labelStyle}>User:</span> {msg}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
const cardStyle = {
  marginTop: '20px',
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9'
};

const titleStyle = {
  margin: '0 0 10px 0',
  paddingBottom: '10px',
  borderBottom: '2px solid #007bff', // 파란색 하단 구분선
  color: '#333'
};

const listStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0',
  maxHeight: '300px', // 메시지가 많아지면 스크롤 발생
  overflowY: 'auto'
};

const itemStyle = {
  backgroundColor: '#fff',
  padding: '10px',
  marginBottom: '8px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  borderLeft: '4px solid #007bff' // 메시지마다 왼쪽에 포인트 선
};

const labelStyle = {
  fontWeight: 'bold',
  color: '#007bff',
  marginRight: '8px'
};

const emptyStyle = {
  textAlign: 'center',
  color: '#999',
  padding: '20px 0'
};

export default MessageDisplay;
