import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Map.css'

import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = ({ spot}) => {
    const key = useSelector((state) => state.maps.key);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    if (!key) {
        return null;
    }

    return (
        <div id='mapContainerId'>
            <h4 id='mapTitle'>Where you'll be staying:</h4>
            <h5>Please note: the exact location will be provided after booking</h5>
            <Maps apiKey={key} spot={spot} />
        </div>
    );
};

export default MapContainer;