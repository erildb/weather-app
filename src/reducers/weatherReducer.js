import { FETCH_WEATHER, DELETE_WEATHER } from "../actions";

const weatherReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_WEATHER:
      return [action.payload, ...state];
    case DELETE_WEATHER:
      return state.filter((state) => state.name !== action.payload);
    default:
      return state;
  }
};

export default weatherReducer;
