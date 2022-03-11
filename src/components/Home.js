import { useState,useEffect} from "react";
import jumbotron_bg from "../assets/jumbotronimg1.jpg";
import TextInput from "./shared/TextInput";
import Button from "./shared/Button";
import { addNewCity, getLocalStorageTokens } from "../utils/localStorage";
import PreviousSearches from "./PreviousSearches";


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
        className="w-full h-2/3 bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url(${jumbotron_bg})` }}
      >
        <h1 className="text-3xl mb-4 text-blue-900">Search Weather For City</h1>
        <div>
          <TextInput
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            classes="w-96 h-10"
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
          <div className="text-blue-800">
            {cityWeatherDetails.descriptor}, Temperature:{" "}
            {cityWeatherDetails.temperature}, Feels Like:
            {cityWeatherDetails.feelsLike}
          </div>
        )}
      </div>

      <div className="flex p-4">
        <div className="w-2/3">sresth</div>
        <div className="w-1/3">
          <PreviousSearches previousSearches = {previousSearches}/>
        </div>
      </div>
    </div>
  );
}
