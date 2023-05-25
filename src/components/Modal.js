import React from 'react';

export default function Modal({ weather }) {
  return (<div className="flex flex-col w-full lg:max-w-xl max-w-lg mx-auto  text-center  mt-20 border-2 shadow-lg py-4 px-8 my-8">

    <div className="text-5xl font-semibold tracking-wide">
      <img className="md:h-44 h-28  mx-auto"
        src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />

      <h5 className="mt-3 text-2xl lg:text-5xl text-yellow-50 mx-auto">
        {weather.name} {((weather.main.temp) - 273.15).toFixed(2)}°C
      </h5>

      <p className="font-semibold text-xl lg:text-3xl text-left mt-8">{weather.weather[0].description} winds are blowing at a speed of {weather.wind.speed} miles/hour and the visibility is {weather.visibility} metre</p>

    </div>
  </div>);
};
