import { useHistory } from 'react-router-dom'
import './SpotIndexItem.css'

const SpotIndexItem = ({ spot }) => {
    const history = useHistory()

    const routeSpot = () => {
        history.push(`/spots/${spot?.id}`)
    }
    return (
        spot && (<div onClick={routeSpot} title={spot.name} id="spotIndexPoint">
            <div id="spotImageContainer" key={spot?.id} >
                <img src={spot?.previewImage} width={300} height={300}></img>
            </div>
            <div id="spotDetailsContainer">
                <a>{spot?.city}, {spot?.state}</a>
                {spot?.avgRating && <a><i className="fa-solid fa-star"></i> {spot?.avgRating?.toFixed(2)}</a>}
                {!spot?.avgRating && <a><i className="fa-solid fa-star"></i> New </a>}
            </div>
            <div id="spotPriceContainer">
                <a>${spot?.price} per night</a>
            </div>
        </div>)
    )
}

export default SpotIndexItem;

