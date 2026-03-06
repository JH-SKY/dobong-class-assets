import React from "react";

// const UserProfile = (props) => {
//   const { name, age } = props;
const UserProfile = ({ name = "익명", age = 0 }) => {
  const nickname = name + "쨩";
  return (
    <div className="box">
      <div>UserProfile</div>
      <p>이름 : {name}</p>
      <p>별명 : {nickname}</p>
      <p>나이 : {age}</p>
    </div>
  );
};

export default UserProfile;
