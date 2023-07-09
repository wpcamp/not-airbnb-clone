import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { thunkGetSpot } from "../../store/spots";
import { useEffect, useState } from "react";
import './SpotShow.css'
import { csrfFetch } from "../../store/csrf";

export const SpotShow = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots[spotId])
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        const fetchSpotReviews = async () => {
            const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
            const reviews = await res.json()
            setReviews(reviews)
        }
        dispatch(thunkGetSpot(spotId))
        fetchSpotReviews()
    }, [dispatch, spotId])
    console.log(reviews)
    return (
        <>
            <div>
                <h1 id='spotTitle'>
                    {spot?.name}
                </h1>
                <h4 id='spotLocation'>
                    {spot?.city}, {spot?.state}, {spot?.country}
                </h4>
                <div className="spotImages">
                    <div id="mainSpotImage">
                        <img src={spot?.SpotImages[0].url} width={500} height={500}></img>
                    </div>
                    <div className="secondColSpotImages">
                        <img src={spot?.SpotImages[0].url} width={250} height={250}></img>
                        <img src={spot?.SpotImages[0].url} width={250} height={250}></img>
                    </div>
                    <div className="thirdColSpotImages">
                        <img src={spot?.SpotImages[0].url} width={250} height={250}></img>
                        <img src={spot?.SpotImages[0].url} width={250} height={250}></img>
                    </div>
                </div>
                <div className="hostDescriptionReserveDiv">
                    <div >
                        <div id='hostedByDiv'>
                            Hosted by {spot?.Owner.firstName} {spot?.Owner.lastName}
                        </div>
                        <div>
                            {spot?.description}
                        </div>
                    </div>
                    <div className="priceReserveDiv">
                        <div id='priceReviewsDiv'>
                            <a>${spot?.price} per night</a>
                            <a><i className="fa-solid fa-star"></i> {spot?.avgRating}  	•    {spot?.numReviews} reviews</a>
                        </div>
                        <div className="reserveButtonDiv">
                            <button id='reserveButton' type="submit">RESERVE</button>
                        </div>
                    </div>
                </div>
                <div>
                    <a><i className="fa-solid fa-star"></i> {spot?.avgRating} • {spot?.numReviews} reviews</a>
                </div>
                {reviews.map(review => {
                    return (
                        <div>
                            <div id='reviewUserName'>
                                {review.User.firstName}
                            </div>
                            <div id='reviewDate'>
                                {review.createdAt.slice(5, 7)}-{review.createdAt.slice(0, 4)}
                            </div>
                            <div id='reviewReview'>
                                {review.review}
                            </div>
                        </div>)
                })}
            </div>


        </>
    )
}