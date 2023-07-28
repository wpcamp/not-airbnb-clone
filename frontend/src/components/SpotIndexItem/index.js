import { thunkGetSpots, thunkGetSpot } from "../../store/spots";
import { Link, useHistory } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


const SpotIndexItem = ({ spot }) => {
    const history = useHistory()
    const routeSpot = () => {
        history.push(`/spots/${spot?.id}`)
    }
    return (
        <div onClick={routeSpot} title={spot.name} id="spotIndexPoint">
            <div id="spotImageContainer" key={spot?.id} >
                <img src={spot?.previewImage} width={300} height={300}></img>
            </div>
            <div id="spotDetailsContainer">
                <a>{spot?.city}, {spot?.state}</a>
                <a><i className="fa-solid fa-star"></i> {spot?.avgRating?.toFixed(2)}</a>
            </div>
            <div id="spotPriceContainer">
                <a>${spot?.price} per night</a>
            </div>
        </div>
    )
}

export default SpotIndexItem;