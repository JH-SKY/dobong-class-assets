import React, { useState } from 'react'
import MessageInput from './MessageInput'
import MessageDisplay from './MessageDisplay'

// 부모 컴포넌트(MessageContainer)에서 message State를 관리하고,MessageInput 
// 컴포넌트에서 메시지를 입력하면 MessageDisplay 컴포넌트에 표시되도록 만드시오.
//  컴포넌트 구조는 다음과 같이 구성하시오.

const MessageContainer = () => {
  const [messages, setMessages] = useState(["안녕"]);
  return (
    <div className='card'>
      <MessageInput messages={messages} setMessages={setMessages} />
      <MessageDisplay messages={messages} />
    </div>
  )
}

export default MessageContainer