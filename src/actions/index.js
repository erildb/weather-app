import axios from "axios";

const API_KEY = "e2437c7b08684aeba5b365ff285ad995";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = "FETCH_WEATHER";
export const DELETE_WEATHER = "DELETE_WEATHER";
export const FETCH_WEATHER_FORECAST = "FETCH_WEATHER_FORECAST";

// export const fetchWeather = (city) => (dispatch) => {
//   _fetchWeather(city, dispatch);
// };

// const _fetchWeather = _.memoize(async (city, dispatch) => {
//   const url = `${WEATHER_URL}&q=${city}`;
//   const response = await axios.get(url);

//   dispatch({ type: FETCH_WEATHER, payload: response.data });
// });

export const fetchWeather = (city) => async (dispatch) => {
  const url = `${WEATHER_URL}&q=${city}`;
  const response = await axios.get(url);

  dispatch({ type: FETCH_WEATHER, payload: response.data });
};

export const deleteWeather = (index) => async (dispatch) => {
  dispatch({ type: DELETE_WEATHER, payload: index });
};

export const fetchWeatherForecast = (city) => async (dispatch) => {
  const url = `${FORECAST_URL}&q=${city}`;
  const response = await axios.get(url);
  dispatch({ type: FETCH_WEATHER_FORECAST, payload: response.data });
};
