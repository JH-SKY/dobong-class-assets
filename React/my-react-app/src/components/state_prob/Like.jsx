import React from "react";
import { useState } from "react";

const Like = () => {
  // 1. 좋아요 버튼을 클릭하면
  //    -> 좋아요 버튼이 존재해야 한다
  //    -> 좋아요 버튼 클릭에 대한 이벤트가 존재한다.
  // 2. 좋아요 수가 1씩 증가한다.
  //    -> 좋아요 수 라는것은 동적 데이터이다. 즉 state로 해야한다.
  //    -> 위에서 언급한 이벤트를 통해 이녀석을 +1 해줘야 한다.
  const [likeCount, setlikeCount] = useState(0);

  const handleClick = () => {
    // api 요청을 보냅니다. => 좋아요에 대한 요청.
    // 만약 성공한다면
    setlikeCount(likeCount + 1);
    // 만약 실패한다면
    // 아무것도 안합니다.
  };
  return (
    <div className="card">
      <div>Like</div>
      <button onClick={handleClick}>♥</button>
      <span>{likeCount}</span>
    </div>
  );
};

export default Like;
