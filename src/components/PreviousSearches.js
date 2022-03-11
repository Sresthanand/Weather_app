import { getLocalStorageTokens } from "../utils/localStorage";
import { useEffect, useState } from "react";

export default function PreviousSearches() {
  const [previousSearches, setPreviousSearches] = useState([]);
  const [currentSearchResults, setCurrentSearchesResults] = useState({});

  useEffect(() => {
    const tokens = getLocalStorageTokens();
    const previousSearches = tokens.previousSearches;
    setPreviousSearches(previousSearches);
  }, []);

  useEffect(() => {
    const getData = async () => {
      let ans = {};
      for (let i of previousSearches) {
        const data = await handleSearch(i);
        ans[i] = data;cd 
      }
      setCurrentSearchesResults(ans);
    };
    getData();
  }, [previousSearches]);

  const handleSearch = async (searchValue) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=f1600ad5dbe2a16371476f7b8d031fcf`
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

      <div className="shadow-lg rounded-lg p-1 text-center overflow-auto">
        {JSON.stringify(currentSearchResults)}
      </div>
    </div>
  );
}
