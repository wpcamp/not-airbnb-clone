import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Maps = ({ apiKey }) => {
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots[spotId]);

    const [doneLoading, setDoneLoading] = useState(false);

    const containerStyle = {
        width: '500px',
        height: '500px',
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });

    const defaultCenter = {
        lat: 0,
        lng: 0,
    };

    const center = spot
        ? { lat: spot.lat, lng: spot.lng }
        : defaultCenter;

    const mapOptions = {
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }],
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#87CEEB' }],
            },
        ],
    };

    useEffect(() => {
        setDoneLoading(true);
    }, [spot]);

    return (
        <>
            <div>
                {doneLoading && spot && isLoaded && (
                    <div className='map-container'>
                        {isLoaded && (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={14}
                                options={mapOptions}
                            >
                                <Marker
                                    key={spot.id}
                                    position={{ lat: spot.lat, lng: spot.lng }}
                                    title={spot.name}
                                    animation={window.google.maps.Animation.DROP}
                                />
                            </GoogleMap>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default React.memo(Maps);
