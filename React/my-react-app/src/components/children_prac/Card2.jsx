import React from "react";

const Card2 = ({ title, children }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Card2;
