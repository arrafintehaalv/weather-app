import React, { Component } from "react";
import "./App.css";
import "./sass/app.scss";
import TopSection from "./components/top/index";
import BottomSection from "./components/bottom/index";
import axios from "axios";

const WEATHER_KEY = "760aec51939a40278ee150706192505";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "Dhaka",
      isLoading: true
    };
  }

  updateWeather() {
    const { cityName } = this.state;
    const URL = `https://api.apixu.com/v1/current.json?key=${WEATHER_KEY}  &q=${cityName}`;
    axios
      .get(URL)
      .then(res => {
        return res.data;
      })
      .then(data => {
        this.setState({
          isLoading: false,
          temp_c: data.current.temp_c,
          text: data.current.condition.text,
          iconURL: data.current.condition.icon,
          humidity: data.current.humidity,
          region: data.location.region,
          country: data.location.country
        });
      })
      .catch(err => {
        if (err) console.error("Cannot fetch Weather Data from API, ", err);
      });
  }

  componentDidMount() {
    const { eventEmitter } = this.props;

    this.updateWeather();

    eventEmitter.on("updateWeather", data => {
      this.setState({ cityName: data }, () => this.updateWeather());
    });
  }

  render() {
    const {
      isLoading,
      cityName,
      temp_c,
      text,
      iconURL,
      humidity,
      country,
      region
    } = this.state;

    return (
      <div className="full-container">
        <div className="app-container">
          <div className="main-container">
            {isLoading && <h3>Loading Weather...</h3>}
            {!isLoading && (
              <div className="top-section">
                <TopSection
                  location={cityName}
                  temp_c={temp_c}
                  text={text}
                  iconURL={iconURL}
                  eventEmitter={this.props.eventEmitter}
                  humidity={humidity}
                  country={country}
                  region={region}
                />
              </div>
            )}
            <div className="bottom-section">
              <BottomSection />
            </div>
            <div className="footer bottom">All Rights Reserved</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
