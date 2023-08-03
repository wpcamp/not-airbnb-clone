import { thunkManageSpots } from "../../store/spots";
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { csrfFetch } from "../../store/csrf";
import { DeleteSpotModal } from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";
import './SpotManage.css'

const SpotManage = () => {
    const spots = Object.values(useSelector((state) => (state.spots ? state.spots : [])))
    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState(null)
    const filteredSpots = spots.filter((spot) => spot?.ownerId === user?.user?.id);

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
        dispatch(thunkManageSpots())
    }, [dispatch])

    const createSpotAction = () => {
        history.push('/spots/new')
    }

    return (
        <>
            <div id="manageSpotsHeader">
                Manage Spots
            </div>
            <div>
                <button id='createSpotButton' onClick={createSpotAction}>Create a New Spot</button>
            </div>
            <ul className="spotContainer">
                {filteredSpots.map((spot) => (
                    <div key={spot?.id}>
                        <div id="spotImageContainer" onClick={() => {
                            history.push(`/spots/${spot?.id}`)
                        }}>
                            <img src={spot?.previewImage} width={300} height={300} alt="Spot Preview"></img>
                        </div>
                        <div id="spotDetailsContainer">
                            <a>{spot?.city}, {spot?.state}</a>
                            {spot?.avgRating && <a><i className="fa-solid fa-star"></i> {spot?.avgRating?.toFixed(2)}</a>}
                            {!spot?.avgRating && <a><i className="fa-solid fa-star"></i> New </a>}
                        </div>
                        <div id="spotPriceContainer">
                            <a>${spot?.price} per night</a>
                        </div>
                        <div className="actionButtons">
                            <button id='updateButtonSpot' onClick={(e) => {
                                e.preventDefault()
                                history.push(`/spots/${spot.id}/edit`)
                            }}>Update</button>
                            <li id='deleteButtonSpot'>
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<DeleteSpotModal spotId={spot.id} />}
                                />
                            </li>
                        </div>
                    </div>
                ))}
            </ul>
        </>
    )
}


export default SpotManage;

