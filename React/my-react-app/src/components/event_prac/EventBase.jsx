import React from "react";
import ChangeExample from "./ChangeExample";
import SubmitExample from "./SubmitExample";
import KeyDownExample from "./KeyDownExample";
import FocusBlurExample from "./FocusBlurExample";

const EventBase = () => {
  const handleClick1 = () => {
    alert("클릭됨!");
  };
  const handleClick2 = (value) => {
    alert(value);
  };
  const handleClick3 = (event) => {
    alert(event.target.textContent);
  };

  return (
    <>
      <button
        className="bg-green-300 px-2 py-1 m-3 rounded"
        onClick={handleClick1}
      >
        클릭1!
      </button>
      <button
        className="bg-green-300 px-2 py-1 m-3 rounded"
        onClick={() => handleClick2("입력값")}
      >
        클릭2!
      </button>
      <button
        className="bg-green-300 px-2 py-1 m-3 rounded"
        onClick={(event) => handleClick3(event)}
      >
        클릭3!
      </button>
      <ChangeExample />
      <SubmitExample />
      <KeyDownExample />
      <FocusBlurExample />
    </>
  );
};

export default EventBase;
