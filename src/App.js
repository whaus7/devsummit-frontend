import React, { Component } from "react";
import "./App.css";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super();

    this.state = {
      posLat: 41,
      posLong: 87,
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
        console.log("size");
        console.log(d._source.mass_in_g);
        td.push({
          lat: d._source.geoLocation.lat,
          lng: d._source.geoLocation.lon,
          size: d._source.mass_in_g === "" ? "10" : d._source.mass_in_g,
          date: d._source.year,
          name: d._source.name
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
      let iconSize = Math.log10(impactInt) * 3;

      if (iconSize < 1) {
        iconSize = 1;
      }

      const customMarker = L.icon({
        iconUrl: require("./impact-icon.png"),
        iconSize: [iconSize, iconSize]
      });

      elements.push(
        <Marker
          key={`impact_${i}`}
          icon={customMarker}
          position={[d.lat, d.lng]}
        >
          <Popup>
            <div>
              {moment
                .unix(new Date(d.date).getTime() / 1000)
                .format("MMM D h:mm A YYYY")}
            </div>
            <div>{d.name}</div>
            <div>{d.size}g</div>
          </Popup>
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
            zIndex: 1000,
            fontWeight: 200
          }}
        >
          <div style={{ fontSize: 42 }}>SCTG Dev Summit</div>
          <div style={{ fontSize: 24, color: "#484848" }}>
            Meteorite Impacts
          </div>
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
              tooltip={false}
              min={0}
              max={5000}
              value={this.state.distance}
              orientation="vertical"
              onChange={this.handleOnChange}
            />
            <div
              style={{
                width: 50,
                color: "#484848",
                fontSize: 10,
                textAlign: "center"
              }}
            >
              Radius
            </div>
            <div style={{ width: 50, fontSize: 14, textAlign: "center" }}>
              {this.state.distance}km
            </div>
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
