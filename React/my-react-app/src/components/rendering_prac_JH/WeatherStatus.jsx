import React from 'react'

const WeatherStatus = () => {
    const isRaining  = false;
    const temperature  = 20;
  return (
    <div>
      <p> {isRaining ? '우산을 챙기세요 !' : '날씨가 좋아용!.'}</p>
      <p> {temperature >= 30 ? '더운 날씨입니다.' : '적당한 날씨입니다.'}</p>
    </div>
  )
}

export default WeatherStatus