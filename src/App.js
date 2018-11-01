import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";

// Using an ES6 transpiler like Babel
import Slider from "react-rangeslider";

// To include the default styles
import "react-rangeslider/lib/index.css";

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      posLat: 51,
      posLong: 123,
      zoom: 4,
      data: [],
      distance: 1000
    };

    this.leafletMap = null;
  }

  buildData(data) {
    let td = [];
    data.data.map(d => {
      console.log(d);
      if (
        d._source.geoLocation.lat !== undefined &&
        d._source.geoLocation.lon !== undefined
      ) {
        td.push({
          lat: d._source.geoLocation.lat,
          lng: d._source.geoLocation.lon,
          size: d._source.mass_in_g
        });
      }
    });

    this.setState({
      data: td
    });
  }

  updateData(lat, long, distance) {
    axios
      .get(
        `https://gwmjkfkd12.execute-api.us-east-2.amazonaws.com/v1/v1/impacts`,
        {
          params: {
            lat: lat,
            lon: long,
            distance: distance,
            records: 3000
          }
        }
      )
      .then(res => {
        console.log(res);
        this.buildData(res);
      });
  }

  componentDidMount() {
    this.updateData(this.state.posLat, this.state.posLong, this.state.distance);

    // this.leafletMap.leafletElement.on("move", function(ev) {
    //   console.log(ev); // ev is an event object (MouseEvent in this case)
    // });

    this.leafletMap.leafletElement.on(
      "click",
      function(ev) {
        console.log(ev); // ev is an event object (MouseEvent in this case)

        this.updateData(ev.latlng.lat, ev.latlng.lng, this.state.distance);
      }.bind(this)
    );
  }

  displayMarkers() {
    let elements = [];
    this.state.data.map((d, i) => {
      // Text number to int
      let impactInt = parseInt(d.size.replace(/,/g, ""));
      console.log(parseInt(d.size.replace(/,/g, "")));

      // Default size
      //let impactSize = 10;
      // if (impactInt > 10000) {
      //   impactSize = impactSize + impactInt * 0.0002;
      //   console.log("wow big");
      //   console.log(impactSize);
      // }
      //
      // if (impactSize > 100) {
      //   impactSize = 100;
      // }

      console.log("log10");
      console.log(Math.log10(impactInt));

      const customMarker = L.icon({
        iconUrl: require("./impact-icon.png"),
        iconSize: [Math.log10(impactInt) * 3, Math.log10(impactInt) * 3]
      });

      elements.push(
        <Marker
          key={`impact_${i}`}
          icon={customMarker}
          position={[d.lat, d.lng]}
        >
          <Popup>Size: {d.size}g</Popup>
        </Marker>
      );
    });
    return elements;
  }

  handleOnChange = value => {
    this.setState({
      distance: value
    });
  };

  render() {
    const position = [this.state.posLat, this.state.posLong];

    return (
      <div id={"mapid"}>
        <div
          style={{
            position: "absolute",
            top: 17,
            left: 65,
            fontSize: 42,
            zIndex: 1000,
            fontWeight: 200
          }}
        >
          SCTG Dev Summit
        </div>
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 4,
            zIndex: 1000
          }}
        >
          <div style={{ width: 50, height: 400 }}>
            <Slider
              min={0}
              max={5000}
              value={this.state.distance}
              orientation="vertical"
              onChange={this.handleOnChange}
            />
          </div>
        </div>
        <Map
          center={position}
          zoom={this.state.zoom}
          ref={m => {
            this.leafletMap = m;
          }}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

export default App;
