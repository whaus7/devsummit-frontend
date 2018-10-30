import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

class App extends Component {

	constructor(props) {
		super();

		this.state = {
			lat: 51.505,
			lng: -0.09,
			zoom: 13,
		}
	}

	render() {
		const position = [this.state.lat, this.state.lng]
		return (
			<div id={'mapid'}>
				<Map center={position} zoom={this.state.zoom}>
					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<Marker position={position}>
						<Popup>
							A pretty CSS3 popup. <br /> Easily customizable.
						</Popup>
					</Marker>
				</Map>
			</div>
		)
	}
}

export default App;
