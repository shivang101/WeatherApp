import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { geocode } from "../utils/geocode";
import { forecast } from "../utils/forecast";
import Country from "./Country";

export default function WeatherApp() {
  const [zipcode, setZipCode] = useState("000000");
  const [city, setCity] = useState("");
  const countryRef = useRef(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const country = countryRef.current.value;
      const result = await geocode(zipcode, country);
      console.log(result);
      const weatherData = await forecast(result.lat, result.lon);
      setWeather(weatherData);
      console.log(weatherData);

    } catch (error) {
      setCity(" ");
      setZipCode(" ");
      setError(error.message);
      setTimeout(() => setError(""), 2000);
      console.log(error
      );

      console.log(error.message);
    };

  };

  return (<>
    {weather && <div className="text-xl w-full max-w-lg mx-auto">{weather.name} {weather.main.temp_max}</div>}
    <form className="w-full max-w-lg mx-auto mt-10" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            ZIP Code
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="number"
            placeholder="Enter ZIP Code"
            onChange={(e) => setZipCode(e.target.value)}
            value={zipcode}
          />

        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Country Code
          </label>
          <Country ref={countryRef} />
        </div>
      </div>

      {error && <div className="text-red-500">{error} </div>}
      <button
        type="submit"
        className="px-4 mx-auto py-1 text-xl font-semibold text-white uppercase  bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
      >
        Submit
      </button>
    </form >
  </>);
};
