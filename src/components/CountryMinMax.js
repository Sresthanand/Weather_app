import TextInput from "./shared/TextInput";
import Button from "./shared/Button";
import { useState } from "react";

export default function CountryMinMax() {
  const [searchValue, setSearchValue] = useState("");
  const [cityWeatherDetails, setCityWeatherDetails] = useState({});

  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=708d89c1b1d4ad5dc1c076645bbbd193`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const weatherData = {
         max_temp: data.main.temp_max,
          min_temp:data.main.temp_min
        };
        setCityWeatherDetails(weatherData);
      });
  };

  return (
    <div className="h-full text-center  w-full rounded-lg shadow-xl flex flex-col items-center justify-center">
      <h1 className="text-xl mb-2 text-purple-900">
        Get Minium and Maximum Temperatures by Country
      </h1>
      <div>
        <TextInput
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          classes="w-96 h-10 border-2 border-purple-700 border-solid"
          placeholder="Enter Country"
        />
        <Button
          textValue="&#128269;"
          classes="bg-white p-2 rounded-lg m-2 hover:shadow-lg"
          onClick={() => {
            handleSearch();
          }}
        />
      </div>
      {cityWeatherDetails.min_temp && (
        <div className="text-blue-800">
        Max Temperature : {cityWeatherDetails.max_temp},
        Min Temperature : {cityWeatherDetails.min_temp}
        </div>
      )}
    </div>
  );
}
