import React, {useState, useEffect} from 'react'
import ReactMapGL, {FlyToInterpolator, Marker, Popup, GeolocateControl, NavigationControl, FullscreenControl} from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import marker from './Marker/marker.png'

const PlacesMap = (props) => {
    const [viewport, setViewport] = useState({
        width: "80%",
        height: "80vh",
        latitude: 37.09024, // for demonstration purposes will be doing it set on US
        longitude: -95.712891, // for demonstration purposes will be doing it set on US
        // latitude: 0, // but intention of app is to include international trips, so ideally can be 0
        // longitude: 0, // but intention of app is to include international trips, so ideally can be 0
        zoom: 3.5
    })
    const [selectedPlace, setSelectedPlace] = useState(null)

    useEffect(() => {
        // sets an event listener on the escape key to change the setSelectedPlace to null (closes popup)
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedPlace(null)
            }
        }
        window.addEventListener("keydown", listener)

        // removes the event listener for the "escape" key
        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])

    // when the user clicks on a marker, 
        // change selected place to that marker's place
        // then set the viewport to move to the place's lat & long & the transition to move to it
    let handleCenter = (evt, place) => {
        console.log(evt)
        // debugger
        setSelectedPlace(place)

        let viewport = {
            width: "80%",
            height: "80vh",
            longitude: parseFloat(place.longitude),
            latitude: parseFloat(place.latitude),
            zoom: 14,
            transitionDuration: 'auto'
        }
        setViewport(viewport)
        
    }

    // after the user clicks on a marker, show the popup for it
    let showSelectedPlacePopup = () => {
        if (selectedPlace) {
            return (
                <Popup 
                    tipSize={5}
                    latitude={parseFloat(selectedPlace.latitude)} 
                    longitude={parseFloat(selectedPlace.longitude)}
                    onClose={() => {
                        setSelectedPlace(null)
                    }}
                >
                    <div>
                        <h2>{selectedPlace.name}</h2>
                        <p>{selectedPlace.category.name}</p>
                        <p>{selectedPlace.address}</p>
                    </div>
                </Popup>
            )
        }
    }

    // all of the markers for the map
    const showPlacesMarkers = () => {
        // let size = 40 // related to the style on 85
        if (props.places.length) {
            return props.places.map((place) => {
                return (
                    <Marker key={place.id} 
                        latitude={parseFloat(place.latitude)} 
                        longitude={parseFloat(place.longitude)}
                    >
                        <button className="marker-btn" onClick={(e) => handleCenter(e, place)} > 
                            <img 
                                // style={{transform: `translate(${-size / 2}px,${-size}px)`}} // works but does a weird thing for the outline when selected
                                src={marker}
                                // src="https://www.flaticon.com/svg/static/icons/svg/968/968374.svg" 
                                alt="place marker"
                                height={30}
                                style={{cursor: 'pointer'}}
                            />
                        </button>
                    </Marker>
                )
            })
        }
    }

    return (
        <div className="places-map">
            <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/wlcreate/ckhcf3qzr0wsn19o9w46dg015"
                // mapStyle="mapbox://styles/mapbox/light-v9"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
                onViewportChange={(viewport) => setViewport(viewport)}
                transitionInterpolator={new FlyToInterpolator({speed: 1.2})}
            >
                {/* displays the lat, long & zoom at top -> .toFixed to limit the numbers after decimal */}
                <div className="sidebarStyle">Longitude: {viewport.longitude.toFixed(4)} | Latitude: {viewport.latitude.toFixed(4)} | Zoom: {viewport.zoom.toFixed(0)}</div>
                {/* displays control for the map on the right side of the map */}
                <div style={{position: 'absolute', right: 0}}>
                    <div style={{padding: '5px'}}>
                        <GeolocateControl 
                            positionOptions={{enableHighAccuracy: true}}
                            // trackUserLocation={true} // this is only if I want to show the user moving around
                        />
                    </div>
                    <div style={{padding: '5px'}}>
                        <FullscreenControl />
                    </div>
                    <div style={{padding: '5px'}}>
                        <NavigationControl />
                    </div>
                </div>
                
                {showPlacesMarkers()} 
                {showSelectedPlacePopup()}
            </ReactMapGL>
        </div>
    )
}

export default PlacesMap