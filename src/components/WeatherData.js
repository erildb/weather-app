import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "../components/Chart";
import GoogleMap from "../components/GoogleMap";
import _ from "lodash";
import "../style/WeatherList.css";
import { fetchWeatherForecast } from "../actions";
import { Link } from "react-router-dom";

class WeatherData extends Component {
  constructor(props) {
    super(props);

    this.renderForecast = this.renderForecast.bind(this);
  }

  componentDidMount() {
    this.props.fetchWeatherForecast(this.props.match.params.id);
  }

  renderForecast(weatherForecast) {
    if (_.isEmpty(weatherForecast)) {
      return (
        <tr>
          <td>loading</td>
        </tr>
      );
    }

    const name = weatherForecast.city.name;
    const temps = _.map(
      weatherForecast.list.map((weather) => weather.main.temp),
      (temp) => temp - 273
    );
    const pressures = weatherForecast.list.map(
      (weather) => weather.main.pressure
    );
    const humidities = weatherForecast.list.map(
      (weather) => weather.main.humidity
    );
    const { lon, lat } = weatherForecast.city.coord;

    return (
      <tr key={name}>
        <td>
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td>
          <b>Temperature</b> <br />
          <Chart data={temps} color="orange" units="°C" /> <br />
          <b>Pressure</b> <br />
          <Chart data={pressures} color="blue" units="hPa" />
          <br />
          <b>Humidity</b> <br />
          <Chart data={humidities} color="green" units="%" />
          <br />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <>
        <div className="backlink">
          <Link to={`/`}>
            <button className="ui button primary">Back to Search</button>
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Map</th>
              <th>5 day Forecast</th>
            </tr>
          </thead>
          <tbody>{this.renderForecast(this.props.weatherForecast)}</tbody>
        </table>
      </>
    );
  }
}

function mapStateToProps(state) {
  return { weatherForecast: state.weatherForecast };
}

export default connect(mapStateToProps, { fetchWeatherForecast })(WeatherData);
