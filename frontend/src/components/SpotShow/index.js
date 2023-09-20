import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { thunkGetSpot } from "../../store/spots";
import { BarLoader } from 'react-spinners';
import { ReviewCard } from "../Review";
import MapContainer from '../Maps';

import './SpotShow.css'

export const SpotShow = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots[spotId])
    const [reviews, setReviews] = useState([])
    const [user, setUser] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const fetchSpotReviews = async (spotId) => {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
        const reviews = await res.json()
        setReviews(reviews)
    }

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
        dispatch(thunkGetSpot(spotId))
        fetchSpotReviews(spotId).then(setIsLoaded(true))
    }, [dispatch, spotId])

    const reserveClick = () => {
        return window.alert('Feature coming soon!')
    }

    return (
        isLoaded ? (
            <>
                <div>
                    <h1 id='spotTitle'>
                        {spot && spot?.name}
                    </h1>
                    <h4 id='spotLocation'>
                        {spot && spot?.city}, {spot && spot?.state}, {spot && spot?.country}
                    </h4>

                    <div className="grid-container">
                        <div id="main-image">
                            {spot?.SpotImages && <img src={spot && spot?.SpotImages[0]?.url} alt="Main Image" className="main-image" />}
                        </div>
                        <div className="secondary-images">
                            <div className="image" >
                                {spot?.SpotImages && (
                                    <img src={spot && spot?.SpotImages[1]?.url || spot?.SpotImages[0]?.url} alt="Image 2" className="small-image" />
                                )}
                            </div>
                            <div className="image" id="topRightImg">
                                {spot?.SpotImages && (
                                    <img src={spot && spot?.SpotImages[2]?.url || spot?.SpotImages[0]?.url} alt="Image 3" className="small-image" />
                                )}
                            </div>
                            <div className="image" >
                                {spot?.SpotImages && (
                                    <img src={spot && spot?.SpotImages[3]?.url || spot?.SpotImages[0]?.url} alt="Image 4" className="small-image" />
                                )}
                            </div>
                            <div className="image" id="bottomRightImg">
                                {spot?.SpotImages && (
                                    <img src={spot && spot?.SpotImages[4]?.url || spot?.SpotImages[0]?.url} alt="Image 5" className="small-image" />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="hostDescriptionReserveDiv">
                        <div >
                            <div id='hostedByDiv'>
                                Hosted by {spot && spot?.Owner?.firstName} {spot && spot?.Owner?.lastName}
                            </div>
                            <div id="descriptDiv">
                                {spot && spot?.description}
                            </div>
                        </div>
                        <div className="price-reserve-container">
                            <div className="price-reviews">
                                <div className="price">
                                    <span>${spot && spot?.price} per night</span>
                                </div>
                                <div className="reviews">
                                    {reviews.length === 0 ? (
                                        <span>
                                            <i className="fa-solid fa-star"></i> New
                                        </span>
                                    ) : reviews.length === 1 ? (
                                        <span>
                                            <i className="fa-solid fa-star"></i> {spot?.avgRating?.toFixed(2)} • {spot?.numReviews} review
                                        </span>
                                    ) : (
                                        <span>
                                            <i className="fa-solid fa-star"></i> {spot?.avgRating?.toFixed(2)} • {spot?.numReviews} reviews
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="reserve-button">
                                <button id="reserve-button" type="submit" onClick={() => reserveClick()}>
                                    Reserve
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="mapDivA">
                    <div>
                        <ReviewCard />
                    </div>
                    <div>
                        <MapContainer spot={spot} />
                    </div>
                </div>
            </>
        ) : (
            <>
                <div>
                    <BarLoader color='#FF385C' />
                </div>
            </>
        )
    )
}




