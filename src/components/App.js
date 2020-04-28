import React from "react";

import styled from "styled-components";

const WeatherWrapper = styled.div`
  padding: 60;
`;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      weather: "",
    };
  }

  componentDidMount() {}

  render() {
    return <WeatherWrapper></WeatherWrapper>;
  }
}

export default App;
