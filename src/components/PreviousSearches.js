import { getLocalStorageTokens } from "../utils/localStorage";
import { useEffect, useState } from "react";

export default function PreviousSearches({ previousSearches }) {
  const [currentSearchResults, setCurrentSearchesResults] = useState({});

  useEffect(() => {
    const getData = async () => {
      let ans = {};
      for (let i of previousSearches) {
        const data = await handleSearch(i);
        ans[i] = data;
      }
      setCurrentSearchesResults(ans);
    };
    getData();
  }, [previousSearches]);

  const handleSearch = async (searchValue) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=708d89c1b1d4ad5dc1c076645bbbd193`
    );
    const formattedResponse = await response.json();
    const weatherData = {
      descriptor: formattedResponse.weather[0].main,
      temperature: formattedResponse.main.temp,
      feelsLike: formattedResponse.main.feels_like,
    };
    return weatherData;
  };

  return (
    <div className="w-full h-full overflow-auto ">
      <div className="shadow-lg rounded-lg p-1 text-center">
        <h1 className="text-xl text-blue-900">Previous Searches</h1>
      </div>

      <div className="hover:shadow-lg rounded-lg p-1 text-center overflow-auto text-blue-700 p-3 bg-blue-200 ">
        {Object.keys(currentSearchResults).map((value) => {
            const cityWeatherDetails = currentSearchResults[value];
          return (
            <div key={value}>
              {value}: {cityWeatherDetails.descriptor}, Temperature:{" "}
              {cityWeatherDetails.temperature}, Feels Like:
              {cityWeatherDetails.feelsLike}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}
