import { useState, useEffect } from "react";
import jumbotron_bg from "../assets/giphy.svg";
import TextInput from "./shared/TextInput";
import Button from "./shared/Button";
import { addNewCity, getLocalStorageTokens } from "../utils/localStorage";
import PreviousSearches from "./PreviousSearches";
import CountryMinMax from "./CountryMinMax";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [cityWeatherDetails, setCityWeatherDetails] = useState({});
  const [previousSearches, setPreviousSearches] = useState([]);

  useEffect(() => {
    const tokens = getLocalStorageTokens();
    const previousSearches = tokens.previousSearches;
    setPreviousSearches(previousSearches);
  }, [cityWeatherDetails]);

  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=708d89c1b1d4ad5dc1c076645bbbd193`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const weatherData = {
          descriptor: data.weather[0].main,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
        };
        setCityWeatherDetails(weatherData);
        addNewCity(searchValue);
      });
  };

  return (
    <div className="w-full h-full">
      <div

        className="w-full h-2/3 bg-center flex  items-center justify-center bg-cover p-6"
        // style={{ backgroundImage: `url(${jumbotron_bg})` }}
      >
        <div className="w-1/2 h-full flex items-center justify-center">
        <img src={jumbotron_bg}></img>
        </div>
   <div className="w-1/2 h-full flex-col flex items-center justify-center bg-gray-200 rounded-lg">
        <h1 className="text-3xl mb-4 text-purple-900">Search Weather For City</h1>
        <div>
          <TextInput
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            classes="w-96 h-10 border-2 border-purple-700 border-solid"
            placeholder="Enter Location"
          />
          <Button
            textValue="&#128269;"
            classes="bg-white p-2 rounded-lg m-2 hover:shadow-lg"
            onClick={() => {
              handleSearch();
            }}
          />
        </div>
        {cityWeatherDetails.descriptor && (
          <div className="text-purple-800">
            {cityWeatherDetails.descriptor}, Temperature:{" "}
            {cityWeatherDetails.temperature}, Feels Like:
            {cityWeatherDetails.feelsLike}
          </div>
        )}
</div>

      </div>

      <div className="flex p-4 h-1/3">
        <div className="w-2/3 h-full pr-3">
          <CountryMinMax />
        </div>
        <div className="w-1/3">
          <PreviousSearches previousSearches={previousSearches} />
        </div>
      </div>
    </div>
  );
}
