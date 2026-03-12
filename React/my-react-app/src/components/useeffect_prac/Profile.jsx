import { useState, useEffect } from "react";

const Profile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => {
    console.log(`이름: ${name}, 나이: ${age}`);
  }, [name, age]); // ← name 또는 age가 변경되면 실행

  useEffect(() => {
    console.log(`나이 : ${age}`);
  }, [age]);

  return (
    <div className="card">
      <input
        className="input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <button className="button" onClick={() => setAge(age + 1)}>
        나이 +1 (현재: {age})
      </button>
    </div>
  );
};

export default Profile;
