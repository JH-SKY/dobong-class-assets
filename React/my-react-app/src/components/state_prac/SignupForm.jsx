import { useState } from "react";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);

  const handleSubmit = () => {
    console.log("이름:", name);
    console.log("이메일:", email);
    console.log("나이:", age);
  };

  return (
    <div className="card">
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="나이"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <button className="button" onClick={handleSubmit}>
        가입
      </button>
    </div>
  );
};

export default SignupForm;
