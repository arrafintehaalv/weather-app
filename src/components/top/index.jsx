import React from "react";

import "./styles.scss";
import Weather from "./weather";

import { Manager, Reference, Popper } from "react-popper";

export default class TopSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelectLocationOpen: false
    };
  }

  onToggleSelectLocation() {
    this.setState(prevState => ({
      isSelectLocationOpen: !prevState.isSelectLocationOpen
    }));
  }

  onLocationNameChange(e) {
    this.setState({
      locationName: e.target.value
    });
  }

  onSelectCity() {
    const { locationName } = this.state;
    const { eventEmitter } = this.props;
    eventEmitter.emit("updateWeather", locationName);
    this.setState({ isSelectLocationOpen: false });
  }

  render() {
    const { isSelectLocationOpen } = this.state;
    // const { eventEmitter } = this.props;

    return (
      <div className="top-container">
        <div className="title">Weather View</div>
        <Weather {...this.props} />
        <Manager>
          <Reference>
            {({ ref }) => (
              <button
                className="btn btn-select-location"
                ref={ref}
                onClick={this.onToggleSelectLocation.bind(this)}
              >
                Select Location
              </button>
            )}
          </Reference>
          <Popper placement="top">
            {({ ref, style, placement, arrowProps }) =>
              isSelectLocationOpen && (
                <div
                  className="popup-container"
                  ref={ref}
                  style={style}
                  data-placement={placement}
                >
                  <div className="form-container">
                    {/* For the cities of Bangladesh*/}
                    <select onChange={this.onLocationNameChange.bind(this)}>
                      <option value="" selected />
                      <option value="Dhaka">Dhaka</option>
                      <option value="Rajshahi">Rajshahi</option>
                      <option value="Barisal">Barisal</option>
                      <option value="Comilla">Comilla</option>
                      <option value="Mymensingh">Mymensingh</option>
                      <option value="Chittagong">Chittagong</option>
                      <option value="Khulna">Khulna</option>
                      <option value="Gazipur">Gazipur</option>
                      <option value="Narayanganj">Narayanganj</option>
                      <option value="Rangpur">Rangpur</option>
                    </select>
                    <br />

                    {/* For All the cities */}
                    {/* <label htmlFor="location-name">Location Name</label> */}
                    {/* <input
                      id="location-name"
                      type="text"
                      placeholder="City Name"
                      onChange={this.onLocationNameChange.bind(this)}
                    /> */}
                    <button
                      className="btn btn-select-location"
                      onClick={this.onSelectCity.bind(this)}
                    >
                      Select
                    </button>
                  </div>
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )
            }
          </Popper>
        </Manager>
      </div>
    );
  }
}
