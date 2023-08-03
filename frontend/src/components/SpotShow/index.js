import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { thunkGetSpot } from "../../store/spots";
import { CreateReviewModal } from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import { DeleteReviewModal } from "../DeleteModal";
import './SpotShow.css'

export const SpotShow = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots[spotId])
    const [reviews, setReviews] = useState([])
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
        const fetchSpotReviews = async () => {
            const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
            const reviews = await res.json()
            setReviews(reviews)
        }
        dispatch(thunkGetSpot(spotId))
        fetchSpotReviews()
    }, [dispatch, spotId])

    const reserveClick = () => {
        return window.alert('Feature coming soon!')
    }

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
                        {spot?.SpotImages && <img src={spot && spot?.SpotImages[1]?.url || spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                        {spot?.SpotImages && <img src={spot && spot?.SpotImages[2]?.url || spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                    </div>
                    <div className="thirdColSpotImages">
                        {spot?.SpotImages && <img src={spot && spot?.SpotImages[3]?.url || spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                        {spot?.SpotImages && <img src={spot && spot?.SpotImages[4]?.url || spot?.SpotImages[0]?.url} width={250} height={250}></img>}
                    </div>
                </div>
                <div className="hostDescriptionReserveDiv">
                    <div >
                        <div id='hostedByDiv'>
                            Hosted by {spot && spot?.Owner?.firstName} {spot && spot?.Owner?.lastName}
                        </div>
                        <div>
                            {spot && spot?.description}
                        </div>
                    </div>
                    <div className="priceReserveDiv">
                        <div id='priceReviewsDiv'>
                            <a>${spot && spot?.price} per night</a>
                            {reviews.length > 1
                                ? <a><i className="fa-solid fa-star"></i> {spot?.avgRating?.toFixed(2)} • {spot?.numReviews} reviews</a>
                                : reviews.length === 1
                                    ? <a><i className="fa-solid fa-star"></i> {spot?.avgRating?.toFixed(2)} • {spot?.numReviews} review</a>
                                    : <a><i className="fa-solid fa-star"></i> New</a>
                            }
                        </div>
                        <div className="reserveButtonDiv">
                            <button id='reserveButton' type="submit" onClick={() => reserveClick()}>RESERVE</button>
                        </div>
                    </div>
                </div>
                <div>
                    {(!reviews?.length) && <a><i className="fa-solid fa-star"></i> New </a>}
                    {(reviews?.length === 1) && <a><i className="fa-solid fa-star"></i> {spot && spot?.avgRating?.toFixed(2)} • {spot && spot?.numReviews} review</a>}
                    {(reviews?.length > 1) && <a><i className="fa-solid fa-star"></i> {spot && spot?.avgRating?.toFixed(2)} • {spot && spot?.numReviews} reviews</a>}
                </div>
                <div>
                    {((user?.user && spot?.ownerId !== user?.user?.id && (!reviews?.find(review => review?.userId === user?.user?.id)) && reviews.length === 0)
                        &&
                        <div className='postReviewButton'>
                            <div>
                                <OpenModalButton
                                    buttonText="Post Your review"
                                    modalComponent={<CreateReviewModal spotId={spot?.id} />}
                                />
                            </div>
                            <div>
                                <a id='postReviewText'>Be the first to post a review</a>
                            </div>
                        </div>)
                        ||
                        ((user?.user && spot?.ownerId !== user?.user?.id && (!reviews?.find(review => review?.userId === user?.user?.id)))
                            &&
                            <div className='postReviewButton'>
                                <OpenModalButton
                                    className='postReviewButton'
                                    buttonText="Post Your review"
                                    modalComponent={<CreateReviewModal spotId={spot?.id} />}
                                /></div>)
                    }
                    {spot && reviews.map(review => {
                        return (
                            <div key={review?.id}>
                                <div id='reviewUserName'>
                                    {spot && review?.User?.firstName}
                                </div>
                                <div id='reviewDate'>
                                    {spot && review?.createdAt?.slice(5, 7)}-{spot && review?.createdAt?.slice(0, 4)}
                                </div>
                                <div id='reviewReview'>
                                    {spot && review?.review}
                                    {(review?.userId === user?.user?.id) && (
                                        <div id="userReviewDeleteButton">
                                            <OpenModalButton
                                                buttonText="Delete"
                                                modalComponent={<DeleteReviewModal reviewId={review?.id} />}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
