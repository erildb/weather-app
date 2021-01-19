import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchWeather } from "../actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getNewCity("berlin");
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const cityName = this.state.term;
    this.getNewCity(cityName);
  }

  getNewCity(city) {
    if (
      this.props.weather.filter(
        (state) => state.name.toLowerCase() === city.toLowerCase()
      ).length !== 0
    ) {
      return;
    }

    this.props.fetchWeather(city);
    this.setState({ term: "" });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Search a City"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
          list="browsers"
        />
        <datalist id="browsers">
          <option value="Munich" />
          <option value="Hamburg" />
          <option value="Frankfurt" />
          <option value="Cologne" />
        </datalist>
        <span className="input-group-button">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </span>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return { weather: state.weather };
}

export default connect(mapStateToProps, { fetchWeather })(SearchBar);
