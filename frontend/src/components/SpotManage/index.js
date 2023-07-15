import { thunkGetSpots, thunkGetSpot, thunkRemoveSpot } from "../../store/spots";
import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SpotIndexItem from "../SpotIndexItem";
import { csrfFetch } from "../../store/csrf";

const SpotManage = () => {
    const spots = Object.values(useSelector((state) => (state.spots ? state.spots : [])))
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState(null)


    const getUser = async () => {
        const userResponse = await csrfFetch('/api/session', {
            method: 'GET'
        });
        const userData = await userResponse.json();
        setUser(userData)
    };

    useEffect(() => {
        const validateUser = async () => {
            await getUser();
        };
        validateUser();
    }, []);


    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    const filteredSpots = spots.filter((spot) => spot?.ownerId === user?.user.id);


    console.log('FILTERED SPOTS ', filteredSpots)
    console.log('USER:', user?.user.id)
    return (
        <>
            <ul className="spotContainer">
                {filteredSpots.map((spot) => (
                    <div key={spot?.id}>
                        <div id="spotImageContainer">
                            <img src={spot?.previewImage} width={300} height={300} alt="Spot Preview"></img>
                        </div>
                        <div id="spotDetailsContainer">
                            <a>{spot?.city}, {spot?.state}</a>
                            <a><i className="fa-solid fa-star"></i> {spot?.avgRating}</a>
                        </div>
                        <div id="spotPriceContainer">
                            <a>${spot?.price} per night</a>
                        </div>
                        <div className="actionButtons">
                            <button id='updateButtonSpot'>Update</button>
                            <button id='deleteButtonSpot' onClick={(e) => {
                                e.preventDefault()
                                dispatch(thunkRemoveSpot(spot.id))
                            }}>Delete</button>
                        </div>
                    </div>
                ))}
            </ul>
        </>
    )
}


export default SpotManage;

