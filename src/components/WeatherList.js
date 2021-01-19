import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import "../style/WeatherList.css";
import { deleteWeather } from "../actions";

function convertUnixDate(unixDate) {
  var date = new Date(unixDate * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var formattedTime = hours + ":" + minutes.substr(-2);
  return formattedTime;
}

class WeatherList extends Component {
  constructor(props) {
    super(props);

    this.renderWeather = this.renderWeather.bind(this);
  }

  renderWeather() {
    return this.props.weather.map((cityData, index) => {
      const name = cityData.name;
      const icon = cityData.weather[0].icon;
      const temp = Math.round(cityData.main.temp - 273);
      const maxTemp = Math.round(cityData.main.temp_max - 273);
      const minTemp = Math.round(cityData.main.temp_min - 273);
      const sunset = cityData.sys.sunset;
      const sunrise = cityData.sys.sunrise;

      return (
        <tr key={name} className="tbl">
          <td>
            <b>{name}</b>
          </td>
          <td>
            <img
              alt={icon}
              src={`http://openweathermap.org/img/w/${icon}.png`}
            />
          </td>
          <td>
            Now: {temp} °C <br />
            Max: {maxTemp} °C <br />
            Min: {minTemp} °C <br />
          </td>
          <td>
            Sunrise: {convertUnixDate(sunrise)} <br />
            Sunset: {convertUnixDate(sunset)} <br />
          </td>
          <td style={{ width: "300px" }}>
            <Link to={`/${name}`}>
              <button className="ui button green">More Data</button>
            </Link>
            <button
              onClick={() => this.props.deleteWeather(name)}
              className="ui red button"
            >
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <table className="table table-hover">
          <thead>
            <tr>
              <th>City</th>
              <th>Weather</th>
              <th>Temperature (°C)</th>
              <th>Sunrise / Sunset</th>
            </tr>
          </thead>
          <tbody>{this.renderWeather()}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { weather: state.weather };
}

export default connect(mapStateToProps, { deleteWeather })(WeatherList);
