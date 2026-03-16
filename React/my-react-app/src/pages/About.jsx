import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="card">
      <div>About</div>
      <Link to="contact">contact 이동(상대경로)</Link>
      <br />
      <Link to="/contact">contact 이동(절대경로)</Link>
      <br />
    </div>
  );
};

export default About;
