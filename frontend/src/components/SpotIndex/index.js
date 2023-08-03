import { thunkGetSpots } from "../../store/spots";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotIndexItem from "../SpotIndexItem";
import './SpotIndex.css'

const SpotIndex = () => {
    const spots = Object.values(useSelector((state) => (state.spots ? state.spots : [])))
    const dispatch = useDispatch()

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

