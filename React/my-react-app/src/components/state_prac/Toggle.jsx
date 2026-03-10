import { useState } from "react";

const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <p>상태: {isOn ? "ON" : "OFF"}</p>
      <button className="button" onClick={handleToggle}>
        토글
      </button>
      <button className="button" onClick={() => setIsOn(!isOn)}>
        토글
      </button>
    </div>
  );
};

export default Toggle;
