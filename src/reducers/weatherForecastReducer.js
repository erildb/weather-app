import { FETCH_WEATHER_FORECAST } from "../actions";

const weatherForecastReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_WEATHER_FORECAST:
      return { ...action.payload };
    default:
      return state;
  }
};

export default weatherForecastReducer;
