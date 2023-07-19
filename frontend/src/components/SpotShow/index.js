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

    return (
        <>
            <div>
                <h1 id='spotTitle'>
                    {spot && spot?.name}
                </h1>
                <h4 id='spotLocation'>
                    {spot && spot?.city}, {spot && spot?.state}, {spot && spot?.country}
                </h4>
                <div className="spotImages">
                    <div id="mainSpotImage">
                        {spot?.SpotImages && <img src={spot && spot?.SpotImages[0]?.url} width={500} height={500}></img>}
                    </div>
                    <div className="secondColSpotImages">
                        {spot?.SpotImages &&<img src={spot && spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                        {spot?.SpotImages &&<img src={spot && spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                    </div>
                    <div className="thirdColSpotImages">
                        {spot?.SpotImages &&<img src={spot && spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                        {spot?.SpotImages &&<img src={spot && spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                    </div>
                </div>
                <div className="hostDescriptionReserveDiv">
                    <div >
                        <div id='hostedByDiv'>
                            Hosted by { spot && spot?.Owner?.firstName} {spot && spot?.Owner?.lastName}
                        </div>
                        <div>
                            {spot && spot?.description}
                        </div>
                    </div>
                    <div className="priceReserveDiv">
                        <div id='priceReviewsDiv'>
                            <a>${spot && spot?.price} per night</a>
                            <a><i className="fa-solid fa-star"></i> {spot && spot?.avgRating?.toFixed(2)}  	•    {spot && spot?.numReviews} reviews</a>
                        </div>
                        <div className="reserveButtonDiv">
                            <button id='reserveButton' type="submit">RESERVE</button>
                        </div>
                    </div>
                </div>
                <div>
                    <a><i className="fa-solid fa-star"></i> {spot && spot?.avgRating.toFixed(2)} • {spot && spot?.numReviews} reviews</a>
                </div>
                {spot && reviews.map(review => {
                    return (
                        <div key={review.id}>
                            <div id='reviewUserName'>
                                {spot && review?.User.firstName}
                            </div>
                            <div id='reviewDate'>
                                {spot && review?.createdAt?.slice(5, 7)}-{spot && review?.createdAt?.slice(0, 4)}
                            </div>
                            <div id='reviewReview'>
                                {spot && review?.review}
                            </div>
                        </div>)
                })}
            </div>
        </>
    )
}