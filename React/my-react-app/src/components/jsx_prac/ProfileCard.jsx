import React from "react";

const ProfileCard = () => {
  const name = "홍길동";
  const age = 20;
  const job = "대학생";
  const hobby = ["코딩", "독서", "운동"];
  const introduce = "안녕하세요! 리액트를 공부하고 있는 홍길동입니다.";
  return (
    <>
      <p>이름 : {name}</p>
      <p>나이 : {age}</p>
      <p>직업 : {job}</p>
      <p>
        취미 : {hobby[0]}, {hobby[1]}, {hobby[2]}
      </p>
      <p>자기소개 : {introduce}</p>
    </>
  );
};

export default ProfileCard;
