import React from "react";

const LikeFoodInput = ({ handleSubmit, setInput, input }) => {
  return (
    <div className="card">
      <div>LikeFoodInput</div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInput(e.target.value)}
          className="input"
          type="text"
          value={input}
        />
      </form>
    </div>
  );
};

export default LikeFoodInput;
