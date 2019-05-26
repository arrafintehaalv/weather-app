import React from "react";

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      location,
      temp_c,
      text,
      iconURL,
      humidity,
      region,
      country
    } = this.props;

    return (
      <div className="weather-container">
        <div className="header">{location}</div>
        <div className="inner-container">
          <div className="image">
            <img src={iconURL} />
          </div>
          <div className="current-weather">{temp_c}°c</div>
        </div>
        <div className="footer">{text}</div> <br />
        <div className="footer">Humidity: {humidity}</div>
        <br />
        <div className="footer">
          {region} {country}
        </div>
      </div>
    );
  }
}
