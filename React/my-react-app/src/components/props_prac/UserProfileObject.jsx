import React from "react";

const UserProfileObject = ({ person }) => {
  return (
    <div className="box">
      <div>UserProfileObject</div>
      <p>이름 : {person.name}</p>
      <p>나이 : {person.age}</p>
    </div>
  );
};

export default UserProfileObject;
