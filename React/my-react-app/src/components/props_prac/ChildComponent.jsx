import React from "react";

const ChildComponent = (props) => {
  //   props.name = "하하호호";
  // props의 변경은 불가능하다.
  return (
    <div className="box">
      <div>ChildComponent</div>
      <p>{props.name}</p>
      <p>{props.age}</p>
    </div>
  );
};

export default ChildComponent;
