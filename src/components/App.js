import React from "react";

import styled from "styled-components";

const WeatherWrapper = styled.div`
  padding: 60;
`;

const TodayWeather = styled.div`
  position: relative;
  border: 1px solid black;
  border-bottom: none;
  height: 300;
`;

const FutureWeather = styled.div`
  display: flex;
  border: 1px solid black;
  align-items: center;
  padding: 10 0;
`;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      weather: "",
    };
  }

  componentDidMount() {
    this.getMyLocation();
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        try {
          fetch(
            `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${latitude},${longitude}`
          )
            .then((res) => res.json())
            .then((res) => this.setState({ weather: res }));
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  render() {
    const darkSky = this.state.weather;
    const place = darkSky && darkSky.timezone && darkSky.timezone.split("/")[1];
    const daily = darkSky && darkSky.daily && darkSky.daily.data;
    const today = daily[0];
    return (
      <WeatherWrapper>
        <TodayWeather></TodayWeather>
        <FutureWeather></FutureWeather>
      </WeatherWrapper>
    );
  }
}

export default App;
