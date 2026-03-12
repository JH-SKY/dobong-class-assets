import React, { useState } from "react";

const ProfileCard = () => {
  const [profile, setProfile] = useState({
    name: "현우",
    age: 22,
    hobby: "코딩",
  });

  const handleClick = () => {
    setProfile({ ...profile, age: profile.age + 1 });
  };

  return (
    <div className="card">
      <div>ProfileCard</div>
      <div>name : {profile.name}</div>
      <div>age : {profile.age}</div>
      <div>hobby : {profile.hobby}</div>
      <button onClick={handleClick} className="button">
        나이 +1
      </button>
    </div>
  );
};

export default ProfileCard;
