import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from 'axios'

class App extends Component {

	constructor(props) {
		super();

		this.state = {
			posLat: 51,
			posLong: 123,
			zoom: 4,
			data: [],
		}
	}

	buildData(data) {
		let td = [];
		data.data.map(d => {
			console.log(d)
			if(d._source.geoLocation.lat !== undefined && d._source.geoLocation.lon !== undefined) {
				td.push({
					lat: d._source.geoLocation.lat,
					lng: d._source.geoLocation.lon,
				})
			}
		})

		this.setState({
			data: td
		})
	}

	componentDidMount() {
		axios.get(`http://localhost:5000/v1/impacts`, {
			params: {
				lat: this.state.posLat,
				lon: this.state.posLong,
				distance: 1000
			}
		})
			.then(res => {
				console.log(res)
				this.buildData(res)
			})
	}

	displayMarkers() {

		let elements = [];
		this.state.data.map(d => {
			console.log(d)
			elements.push(<Marker position={[d.lat, d.lng]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>)
		})
		return elements
	}

	render() {
		const position = [this.state.posLat, this.state.posLong]
		return (
			<div id={'mapid'}>
				<div>asdf</div>
				<Map center={position} zoom={this.state.zoom}>
					<TileLayer
						attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{this.displayMarkers()}
					{/*<Marker position={[44,141]}>*/}
						{/*<Popup>*/}
							{/*A pretty CSS3 popup. <br /> Easily customizable.*/}
						{/*</Popup>*/}
					{/*</Marker>*/}
				</Map>
			</div>
		)
	}
}

export default App;
