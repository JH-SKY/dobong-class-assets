import React from "react";
import { Link } from "react-router-dom";
import Counter from "../components/zustand_prac/Counter";

const Home = () => {
  return (
    <div className="card">
      <div>Home</div>
      <a href="/about">about 이동(a태그)</a>
      <br />

      <Link to="/about">about으로 이동</Link>
      <br />
      <Link to="/contact">contact 이동</Link>
      <br />
      <Counter />
    </div>
  );
};

export default Home;
