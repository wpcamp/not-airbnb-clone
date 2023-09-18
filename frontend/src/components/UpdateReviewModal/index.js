import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetSpot } from "../../store/spots";
import { thunkUpdateReview } from "../../store/reviews";
import { csrfFetch } from "../../store/csrf";
import "./UpdateReviewModal.css"; 

function UpdateReviewModal({ review, reviewFunc, spotId}) {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [stars, setStars] = useState(review.stars); 
    const [reviewText, setReviewText] = useState(review.review); 
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const getUser = async () => {
        const userResponse = await csrfFetch('/api/session', {
            method: 'GET',
        });
        const userData = await userResponse.json();
        setUser(userData);
    };

    useEffect(() => {
        const validateUser = async () => {
            await getUser();
        };
        validateUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        let updatedReview = {
            id: review.id, 
            userId: user?.user?.id,
            review: reviewText,
            stars
        };
        try {
            const updatedRev = await dispatch(thunkUpdateReview(updatedReview));
            if (updatedRev) {
                closeModal();
                reviewFunc(spotId);
            } else {
                setErrors(updatedRev.errors);
            }
        } catch (errors) {
            console.log('Here are the errors: ', errors);
        }
        dispatch(thunkGetSpot(spotId));
    };

    return (
        <>
            <div id="updateReviewModal">
                <div id="updateReviewHeader">Update Your Review</div>
                <div>
                    {errors?.errors?.review && <a>Review must be more than 10 characters</a>}
                    <textarea
                        id="updateReviewTextArea"
                        placeholder="Update your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                </div>
                {errors && <a>{errors?.errors || errors?.message}</a>}
                <div className="updateReviewStarsDiv">
                    <div>
                        {errors?.errors?.stars && <a>Must give a star rating</a>}
                        {stars >= 1 ? (
                            <i className="fa-solid fa-star rev-star" onClick={() => setStars(1)}></i>
                        ) : (
                            <i className="fa-regular fa-star rev-star" onClick={() => setStars(1)}></i>
                        )}
                    </div>
                    <div>
                        {stars >= 2 ? (
                            <i className="fa-solid fa-star rev-star" onClick={() => setStars(2)}></i>
                        ) : (
                            <i className="fa-regular fa-star rev-star" onClick={() => setStars(2)}></i>
                        )}
                    </div>
                    <div>
                        {stars >= 3 ? (
                            <i className="fa-solid fa-star rev-star" onClick={() => setStars(3)}></i>
                        ) : (
                            <i className="fa-regular fa-star rev-star" onClick={() => setStars(3)}></i>
                        )}
                    </div>
                    <div>
                        {stars >= 4 ? (
                            <i className="fa-solid fa-star rev-star" onClick={() => setStars(4)}></i>
                        ) : (
                            <i className="fa-regular fa-star rev-star" onClick={() => setStars(4)}></i>
                        )}
                    </div>
                    <div>
                        {stars >= 5 ? (
                            <i className="fa-solid fa-star rev-star" onClick={() => setStars(5)}></i>
                        ) : (
                            <i className="fa-regular fa-star rev-star" onClick={() => setStars(5)}></i>
                        )}
                    </div>
                    <div>
                        <a id="starsText">Stars</a>
                    </div>
                </div>
                <div id="updateReviewButton">
                    <button
                        onClick={handleSubmit}
                        id={reviewText?.length <= 10 || stars === 0 ? 'disabledButton' : 'notDisabledButton'}
                        disabled={reviewText?.length <= 10 || stars === 0}
                    >
                        Update Your Review
                    </button>
                </div>
            </div>
        </>
    );
}

export { UpdateReviewModal };
