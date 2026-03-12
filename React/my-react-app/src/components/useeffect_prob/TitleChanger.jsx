import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const TitleChanger = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    document.title = name ? name : "React App";
  }, [name]);

  return (
    <div className="card">
      <div>TitleChanger</div>
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        value={name}
        className="input"
      />
      {name}
    </div>
  );
};

export default TitleChanger;
