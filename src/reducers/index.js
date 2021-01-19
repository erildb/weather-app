import { combineReducers } from "redux";
import WeatherReducer from "./weatherReducer";
import WeatherForecastReducer from "./weatherForecastReducer";

const rootReducer = combineReducers({
  weather: WeatherReducer,
  weatherForecast: WeatherForecastReducer,
});

export default rootReducer;
