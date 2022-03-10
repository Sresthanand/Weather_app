export const WEATHER_APP_TOKENS = "weather-app-tokens";
export const TOKENS = ["previousSearches"];

export const addNewCity = (city) => {
  let tokens = getLocalStorageTokens();
  tokens = tokens.previousSearches;
  if (tokens.length < 3) {
    tokens.push(city);
  } else {
    tokens = tokens.slice(1, tokens.length);
    tokens.push(city);
  }
  setLocalStorageTokens({
    previousSearches: tokens,
  });
};

export const getLocalStorageTokens = () => {
  const currentTokens = localStorage.getItem(WEATHER_APP_TOKENS);

  let returnTokens = {
    previousSearches: [],
  };

  if (currentTokens) {
    TOKENS.forEach((token) => {
      returnTokens[token] = JSON.parse(currentTokens)[token];
    });
  }

  return returnTokens;
};

export const setLocalStorageTokens = (tokens) => {
  const currentTokens = getLocalStorageTokens();
  const newTokenValues = { ...currentTokens, ...tokens };
  const tokensToSet = {};

  TOKENS.forEach((token) => {
    tokensToSet[token] = newTokenValues[token];
  });

  localStorage.setItem(WEATHER_APP_TOKENS, JSON.stringify(tokensToSet));
};
