import React, { useState } from "react";
// 프로필 카드 컴포넌트를 만드시오. { name: "현우", age: 22, hobby: "코딩" }
// 객체 State를 사용하고, "나이 +1" 버튼을 누르면 나이만 1 증가하시오
const ProfileCard = () => {
  const [user, setuser] = useState({
    name: "현우",
    age: 22,
    hobby: "코딩",
  });
  const handleClick = () => {
    setuser({ ...user, age: user.age + 1 });
  };
  return (
    <div className="card">
      <p>이름 : {user.name}</p>
      <p>나이 : {user.age}</p>
      <p>취미 : {user.hobby}</p>
      <button className="button" onClick={handleClick}>
        나이 +1
      </button>
    </div>
  );
};
export default ProfileCard;
