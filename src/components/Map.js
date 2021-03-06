import React from "react"
import L from "leaflet";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import './Map.css'
import {Basemap} from "./Basemap";
import {GeojsonLayer} from "./GeojsonLayer";

L.Icon.Default.imagePath = 'https://unpkg.com/leaflet@1.5.0/dist/images/'

class MapComponent extends React.Component {
    state = {
        lat: 55.702868,
        lng: 37.530865,
        zoom: 10,
        basemap: "osm",
        geojsonvisible: false
    }
    onBMChange = (bm) => {
        this.setState({
            ...this.state,
            basemap: bm
        })
    }
    onGeojsonToggle = e => {
        this.setState({geojsonvisible: e.currentTarget.checked})
    }

    render() {
        let center = [this.state.lat, this.state.lng]
        const baseMapsDict = {
            osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
            dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
            cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
        }
        let color = ""
        if (this.state.basemap === "osm") color = "white"
        if (this.state.basemap === "hot") color = "deeppink"
        if (this.state.basemap === "dark") color = "black"
        if (this.state.basemap === "cycle") color = "yellow"
        const style = {
            boxShadow: `0 0 15px ${color}`
        }

        return (
            <div>
                <MapContainer style={style} zoom={this.state.zoom} center={center}>
                    <TileLayer
                        attribution="&amp;copy <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                        url={baseMapsDict[this.state.basemap]}
                    />
                    <Basemap basemap={this.state.basemap} onChange={this.onBMChange}/>
                    <div className={'geojson-toggle'}>
                        <label htmlFor={'layertoggle'}>Toggle Geojson</label>
                        <input type="checkbox" name={'layertoggle'} id={'layertoggle'}
                               value={this.state.geojsonvisible} onChange={this.onGeojsonToggle}/>
                    </div>
                    {this.state.geojsonvisible && <GeojsonLayer url={'geojson.json'}/>}
                    <Marker position={center}>
                        <Popup>Выбрана тема {this.state.basemap}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        )
    }
}

export default MapComponent