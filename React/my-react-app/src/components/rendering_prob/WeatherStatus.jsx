import React from "react";

const WeatherStatus = ({ isRaining = false, temperature = 35 }) => {
  return (
    <div className="card">
      <div>WeatherStatus</div>
      <p>{isRaining ? "우산챙겨" : "날씨좋아"}</p>
      <p>{temperature >= 30 ? "더운 날씨" : "적당"}</p>
    </div>
  );
};

export default WeatherStatus;
