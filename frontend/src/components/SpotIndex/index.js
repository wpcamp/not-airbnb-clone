import { thunkGetSpots, thunkGetSpot } from "../../store/spots";
import { Link, useHistory } from 'react-router-dom'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import './SpotIndex.css'
import SpotIndexItem from "../SpotIndexItem";

const SpotIndex = () => {
    const spots = Object.values(useSelector((state) => (state.spots ? state.spots : [])))
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

   
    return (
        <>
            <ul className="spotContainer">
                {spots.map((spot) => (
                    <>
                        <SpotIndexItem
                            spot={spot}
                            key={spot.id} />
                    </>
                ))}
            </ul>
        </>
    )
}

export default SpotIndex;

