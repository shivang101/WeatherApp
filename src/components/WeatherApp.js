import { useState, useRef } from "react";
import { forecast } from "../utils/forecast";
import Country from "./Country";
import Loader from "./Loader";
import Modal from "./Modal";

export default function WeatherApp() {
  const [zipcode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const countryRef = useRef(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [textValue, setTextValue] = useState("Search by City");
  const [flag, setFlag] = useState(true);

  function handleDisplay(e) {
    if (textValue === "Search by City") {
      setTextValue("Search by Zip Code");
      setFlag(!flag);
    } else {
      setTextValue("Search by City");
      setFlag(!flag);
    };
  };

  async function searchByCity(evt) {
    evt.preventDefault();
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9a9189463659c4dd9b3e989bdd6de94e`;
      setIsLoading(true);
      const response = await fetch(url);

      if (!response.ok) {
        setIsLoading(false);
        throw Error("Invalid City");
      };
      const json = await response.json();
      setIsLoading(false);
      setWeather(json);

    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      setTimeout(() => setError(""), 2000);
    };
    setCity("");

  };

  async function searchByZipCode(evt) {
    evt.preventDefault();

    try {

      const country = countryRef.current.value;
      let json;
      let response;
      try {

        const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},${country}&appid=9a9189463659c4dd9b3e989bdd6de94e`;
        setIsLoading(true);
        response = await fetch(url);
        json = await response.json();

      } catch (error) {
        alert(error.message);
        setIsLoading(false);
      };
      if (!response.ok) {
        setIsLoading(false);
        throw Error("INVALID PIN CODE");
      };

      const result = json;

      const weatherData = await forecast(result.lat, result.lon);
      setIsLoading(false);
      setWeather(weatherData);


    } catch (error) {
      setCity(" ");
      setZipCode(" ");
      setError(error.message);
      setTimeout(() => setError(""), 2000);
    };


  };

  return (
    <>
      <h1 className="text-5xl mt-0 pt-4 text-center font-bold my-8 text-white">
        Weather App
      </h1 >

      <form className="w-full lg:max-w-xl max-w-md mx-auto mt-10"
        onSubmit={textValue === "Search by City" ? searchByZipCode : searchByCity}>
        {flag &&
          <div className="flex flex-wrap -mx-3 mb-6">
            <>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-white text-xl font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  ZIP Code
                </label>
                <input
                  className="appearance-none text-xl font-semibold block w-full bg-gray-200 text-gray-700 border-black border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="number"
                  placeholder="Enter ZIP Code"
                  onChange={(e) => setZipCode(e.target.value)}
                  value={zipcode}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xl text-white  font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Country Code
                </label>
                <Country ref={countryRef} />
              </div></>
          </div>
        }

        {!flag && <div className="flex  mb-6">

          <div className="w-full md:w-1/2  mx-auto mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xl font-bold mb-2"
              htmlFor="grid-first-name"
            >
              City Name
            </label>
            <input
              className="appearance-none text-xl block w-full bg-gray-200 text-gray-700  border-black border-2 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter city name"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
        </div>
        }

        {error && <div className="text-red-500">{error} </div>}
        <div className="flex flex-col">

          <button
            type="button"
            className="px-4 w-1/2 py-1 mx-auto block my-10 text-xl font-semibold text-white uppercase bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600 cursor-pointer"
            onClick={handleDisplay}
          >
            {textValue}
          </button>
          <button
            type="submit"
            className="px-4 w-1/2 py-1 mx-auto text-xl font-semibold text-white uppercase  bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Submit
          </button>
        </div>
      </form >

      {isLoading && <Loader />}
      {weather && <Modal weather={weather} />}

      {/* {weather &&
     
    } */}
    </>);
};
