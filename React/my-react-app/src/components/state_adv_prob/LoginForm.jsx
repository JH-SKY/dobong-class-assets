import React from "react";
import { useState } from "react";

const LoginForm = () => {
  const [form, setForm] = useState({ id: "", password: "", email: "" });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);

    // event의 target에 따라서 수정할 object의 키값을 변경.
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(`${form.id}, ${form.password}, ${form.email}`);
    alert(JSON.stringify(form));

    // id는 유지한체로 비밀번호만 리셋해서 다시 로그인시킨다
    setForm({ ...form, password: "" });

    // state대신에 formdata를 활용해서 데이터를 전달할 수도 있다.
    // 단, pw 리셋과 같은 데이터 관리 측면에서는 살짝 불편하다.
    const data = new FormData(e.currentTarget);
    const objData = Object.fromEntries(data.entries());
    console.log(objData);
  };

  return (
    <div className="card">
      <div>LoginForm</div>
      <form onSubmit={handleSubmit} action="" className="flex flex-col">
        <label htmlFor="">
          id :
          <input
            onChange={handleChange}
            className="input"
            type="text"
            name="id"
            value={form.id}
          />
        </label>
        <label htmlFor="">
          pw :
          <input
            onChange={handleChange}
            className="input"
            type="password"
            name="password"
            value={form.password}
          />
        </label>
        <label htmlFor="">
          email :
          <input
            onChange={handleChange}
            className="input"
            type="email"
            name="email"
            value={form.email}
          />
        </label>
        <button className="button">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
