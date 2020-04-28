import React from "react";

import styled from "styled-components";

import {
  WiDaySunny,
  WiNightClear,
  WiRain,
  WiSnow,
  WiSleet,
  WiWindy,
  WiFog,
  WiCloudy,
  WiDayCloudy,
  WiNightPartlyCloudy,
  WiHail,
  WiThunderstorm,
  WiTornado,
} from "weather-icons-react";

const WeatherWrapper = styled.div`
  padding: 60;
`;

const TodayWeather = styled.div`
  position: relative;
  border: 1px solid black;
  border-bottom: none;
  height: 300;
`;

const GeoInformation = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 10;
`;

const WeatherInformation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 10;
`;

const Place = styled.span`
  font-size: 18;
  text-transform: uppercase;
  text-align: right;
`;
const DateWrapper = styled.span`
  font-size: 18;
  text-align: right;
`;

const DayWrapper = styled.span`
  font-size: 18;
  text-align: right;
`;

const FutureWeather = styled.div`
  display: flex;
  border: 1px solid black;
  align-items: center;
  padding: 10 0;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10;
  margin-left: 10;
  border: 1px solid black;
`;
const WeatherHeader = styled.span`
  padding: 0;
`;

const WeatherStatus = styled.span`
  display: flex;
  padding: 0;
`;
const WeatherOtherStats = styled.span``;

const WeatherCondition = styled.span`
  margin: 10 0;
  text-align: center;
  font-size: 20;
  text-transform: capitalize;
`;
const Icon = styled.div`
  flex: 1;
`;
const Temp = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const TempMin = styled.span`
  font-size: 28;
  text-align: right;
`;
const TempMax = styled.span`
  font-size: 18;
  white-space: nowrap;
`;

const TodaysTempMin = styled.span`
  font-size: 92;
`;
const TodaysTempMax = styled.span`
  font-size: 18;
  white-space: nowrap;
`;

const WeatherFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function TodaysWeatherCard(props) {
  const data = props.data;
  if (data) {
    const icon = getIcon(data.icon);
    const tempMin = data.temperatureMin;
    const tempMax = data.temperatureMax;
    const humidity = data.humidity;
    const wind = data.windSpeed;
    return (
      <>
        <WeatherStatus>
          <Icon>{icon}</Icon>
          <WeatherCondition>{data.icon}</WeatherCondition>
        </WeatherStatus>
        <Temp>
          <TodaysTempMin> {Number(tempMin).toFixed(1)}</TodaysTempMin>
          <TodaysTempMax>Feels like {Number(tempMax).toFixed(1)}</TodaysTempMax>
        </Temp>

        <WeatherFooter>
          <WeatherOtherStats>
            Humidity : {Number(humidity) * 100}
          </WeatherOtherStats>
          <WeatherOtherStats>Wind : {wind}</WeatherOtherStats>
        </WeatherFooter>
      </>
    );
  } else {
    return <></>;
  }
}

function WeatherCard(props) {
  const data = props.data;
  if (data) {
    const timeData = data.time;
    const dataDay = new Date(timeData * 1000).getDay();
    const icon = getIcon(data.icon);
    const tempMin = data.temperatureMin;
    const tempMax = data.temperatureMax;
    const humidity = data.humidity;
    const wind = data.windSpeed;
    return (
      <WeatherBox>
        <WeatherHeader>{day[dataDay]}</WeatherHeader>
        <WeatherStatus>
          <Icon>{icon}</Icon>
          <Temp>
            <TempMin> {Number(tempMin).toFixed(1)}</TempMin>
            <TempMax> Feels like {Number(tempMax).toFixed(1)}</TempMax>
          </Temp>
        </WeatherStatus>
        <WeatherCondition>{data.icon}</WeatherCondition>
        <WeatherFooter>
          <WeatherOtherStats>
            Humidity : {Number(humidity) * 100}
          </WeatherOtherStats>
          <WeatherOtherStats>Wind : {wind}</WeatherOtherStats>
        </WeatherFooter>
      </WeatherBox>
    );
  } else {
    return <></>;
  }
}

function getIcon(icon) {
  if (icon === "clear-day") {
    return <WiDaySunny />;
  }
  if (icon === "clear-night") {
    return <WiNightClear />;
  }
  if (icon === "rain") {
    return <WiRain size={64} />;
  }
  if (icon === "snow") {
    return <WiSnow />;
  }
  if (icon === "sleet") {
    return <WiSleet />;
  }
  if (icon === "wind") {
    return <WiWindy />;
  }
  if (icon === "fog") {
    return <WiFog />;
  }
  if (icon === "cloudy") {
    return <WiCloudy />;
  }
  if (icon === "partly-cloudy-day") {
    return <WiDayCloudy />;
  }
  if (icon === " partly-cloudy-night") {
    return <WiNightPartlyCloudy />;
  }
  if (icon === "hail") {
    return <WiHail />;
  }
  if (icon === "thunderstorm") {
    return <WiThunderstorm />;
  }
  if (icon === "tornado") {
    return <WiTornado />;
  }
}

class App extends React.Component {
  constructor() {
    super();

    const today = new Date();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const day = today.getDay();

    this.state = {
      weather: "",
      date,
      day,
    };

    this.getMyLocation = this.getMyLocation.bind(this);
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
    const place =
      (darkSky && darkSky.timezone && darkSky.timezone.split("/")[1]) ||
      "Kathmandu";
    const daily = darkSky && darkSky.daily && darkSky.daily.data;
    const today = daily[0];
    delete daily[0];
    delete daily[7];

    return (
      <WeatherWrapper>
        <TodayWeather>
          <GeoInformation>
            <Place> {place}</Place>
            <DateWrapper>{this.state.date}</DateWrapper>
            <DayWrapper>{day[this.state.day]}</DayWrapper>
          </GeoInformation>
          <WeatherInformation>
            <TodaysWeatherCard data={today} />
          </WeatherInformation>
        </TodayWeather>
        <FutureWeather>
          {Object.values(daily).map((day, index) => {
            return <WeatherCard data={day} key={index} />;
          })}
        </FutureWeather>
      </WeatherWrapper>
    );
  }
}

export default App;
