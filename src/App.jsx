import React, { Component } from "react";
import logo from "./logo.svg";
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
      cityName: "Dhaka"
    };
  }

  componentDidMount() {
    const { cityName } = this.state;
    const URL = `https://api.apixu.com/v1/current.json?key=${WEATHER_KEY} &q=${cityName}`;
    axios
      .get(URL)
      .then(res => {})
      .catch(err => {
        if (err) {
          console.log("Cannot fetch Weather Data from API. ", err);
        }
      });
  }

  render() {
    return (
      <div className="app-container">
        <div className="main-container">
          <div className="top-section">
            <TopSection />
          </div>
          <div className="bottom-section">
            <BottomSection />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
