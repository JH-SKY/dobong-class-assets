import React from "react";
import { Link } from "react-router-dom";
import useCounterStore from "../store/useCounterStore";

const About = () => {
  const count = useCounterStore((state) => state.count);
  return (
    <div className="card">
      <div>About</div>
      <Link to="contact">contact 이동(상대경로)</Link>
      <br />
      <Link to="/contact">contact 이동(절대경로)</Link>
      <br />
      <div>count : {count}</div>
    </div>
  );
};

export default About;
