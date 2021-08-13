import GoogleMapReact from 'google-map-react'
import './map.css'
import LocationPin from './Marker';

const location = {
    lat: 28.644800,
    lng: 77.216721,
}

const MAPS_API_KEY="";

const Map = ({handleClick, mark}) => {
    return (
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: MAPS_API_KEY }}
                defaultCenter={location}
                defaultZoom={4}
                onClick={handleClick}
            >
                <LocationPin
                    key={"test"}
                    text={"test"}
                    lat={mark.lat}
                    lng={mark.lng}
                />
            </GoogleMapReact>
        </div>
    );
}

export default Map;