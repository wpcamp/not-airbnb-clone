import './Review.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { csrfFetch } from "../../store/csrf";
import { thunkGetSpot } from "../../store/spots";
import { CreateReviewModal } from "../CreateReviewModal";
import OpenModalButton from "../OpenModalButton";
import { DeleteReviewModal } from "../DeleteModal";









export const ReviewCard = () => {

    const { spotId } = useParams()
    const dispatch = useDispatch()
    const spot = useSelector((state) => state.spots[spotId])
    const [reviews, setReviews] = useState([])
    const [user, setUser] = useState(null)

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
        fetchSpotReviews(spotId)
    }, [dispatch, spotId])


    return (
        <>
            <div id="wholeReviewsCardDiv">
                <div>
                    <div className="reviews-summary-card">
                        {(!reviews?.length) && (
                            <div className="card-content">
                                <i className="fa-solid fa-star"></i> New
                            </div>
                        )}
                        {(reviews?.length === 1) && (
                            <div className="card-content">
                                <i className="fa-solid fa-star"></i> {spot && spot?.avgRating?.toFixed(2)} • {spot && spot?.numReviews} review
                            </div>
                        )}
                        {(reviews?.length > 1) && (
                            <div className="card-content">
                                <i className="fa-solid fa-star"></i> {spot && spot?.avgRating?.toFixed(2)} • {spot && spot?.numReviews} reviews
                            </div>
                        )}
                    </div>
                    <div className="post-review-card">
                        {((user?.user && spot?.ownerId !== user?.user?.id && (!reviews?.find(review => review?.userId === user?.user?.id)) && reviews.length === 0) && (
                            <div className='postReviewButton'>
                                <div>
                                    <OpenModalButton
                                        buttonText="Post Your review"
                                        modalComponent={<CreateReviewModal spotId={spot?.id} reviewFunc={fetchSpotReviews} />}
                                    />
                                </div>
                                <div>
                                    <a id='postReviewText'>Be the first to post a review!</a>
                                </div>
                            </div>
                        )) ||
                            ((user?.user && spot?.ownerId !== user?.user?.id && (!reviews?.find(review => review?.userId === user?.user?.id))) && (
                                <div className='postReviewButton'>
                                    <OpenModalButton
                                        className='postReviewButton'
                                        buttonText="Post Your review"
                                        modalComponent={<CreateReviewModal spotId={spot?.id} reviewFunc={fetchSpotReviews} />}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="individual-reviews-card">
                        {spot && reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(review => {
                            return (
                                <div key={review?.id} className="review-card">
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
                                                    modalComponent={<DeleteReviewModal reviewId={review?.id} spotId={spot?.id} reviewFunc={fetchSpotReviews} />}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>


    );
}