import React, { useState } from 'react'

const LikeState = () => {

    const [count, setCount] = useState(0);
    const increase = () => {
    setCount(count + 1); 
  };
  return (
    <div className='card'>
      <p>좋아요 : {count}</p>
      <button onClick={increase} className='border px-3 rounded'>♥</button>
    </div>
   
  )
}

export default LikeState