import { useState } from "react";

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log(form);
    alert(JSON.stringify(form));
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        value={form.name}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="age"
        placeholder="나이"
        value={form.age}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>가입</button>
    </div>
  );
};

export default SignupForm;
