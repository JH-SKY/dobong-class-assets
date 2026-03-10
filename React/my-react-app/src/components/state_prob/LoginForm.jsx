import React, { useState } from "react";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`id : ${id} / pw : ${pw}`);

    setId("");
    setPw("");
  };

  return (
    <div className="card">
      <div>LoginForm</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          ID :
          <input
            type="text"
            className="input"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
        </label>
        <label htmlFor="">
          PW :
          <input
            type="password"
            className="input"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
          />
        </label>
        <button className="button">로그인</button>
      </form>
    </div>
  );
};

export default LoginForm;
