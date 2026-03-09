import React from "react";

const Button = ({ backgroundColor, children }) => {
  return (
    <>
      <button
        style={{
          padding: "5px 10px",
          color: "white",
          backgroundColor: `${backgroundColor}`,
          border: "none",
          borderRadius: "5px",
        }}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
