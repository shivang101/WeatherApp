import React from 'react';

export default function Modal({ weather }) {
  return (<div className=' fixed top-0 w-full z-20 grid place-items-center h-screen bg-[rgba(0,0,0,0.8)] overflow-hidden '>
    <div className=' w-2/3 h-48 bg-transparent text-2xl text-white' >
      {weather.name} feels like {Math.round(weather.main.temp_max - 272.15)}°C
      <p>{weather.weather[0].description} winds are blowing at a speed of {weather.wind.speed} miles/hour and the visibility is {weather.visibility} metre</p>
    </div>
  </div>);
};
