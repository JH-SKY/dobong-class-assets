import React, { useState } from 'react'

const Greeting_prac = () => {
    const [input, setInput] = useState("");
  return (
    <div className='card'>
      <input
        onChange={(event) => setInput(event.target.value)}
        className="input"
        type="text"
        value={input}
      />
      <p>{input.length}</p>
    </div>
  )
}

export default Greeting_prac