import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/spots";
import { csrfFetch } from "../../store/csrf";
import { useHistory } from "react-router-dom";
import "./CreateReviewModal.css"


function CreateReviewModal({ spotId }) {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [stars, setStars] = useState(0)
    const [clicked1, setClicked1] = useState(false)
    const [clicked2, setClicked2] = useState(false)
    const [clicked3, setClicked3] = useState(false)
    const [clicked4, setClicked4] = useState(false)
    const [clicked5, setClicked5] = useState(false)
    const [reviewText, setReviewText] = useState('')
    const [errors, setErrors] = useState({})
    const history = useHistory()
    const { closeModal } = useModal()

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})

        let review = {
            spotId: spotId,
            userId: user?.user?.id,
            review: reviewText,
            stars
        }
        try {
            const newRev = await dispatch(thunkCreateReview(spotId, review))
            if (newRev) {
                closeModal()
            } else {
                setErrors(newRev.errors)
            }
        } catch (errors) {
            console.log('here are the errors: ', errors);
        }
        history.go(0)
    }

    return (
        <>
            <div id='createReviewModal'>
                <div id="createReviewHeader">How was your stay?</div>
                <div>
                    {errors?.errors?.review && <a>Review must be more than 10 characters</a>}
                    <textarea id="createReviewTextArea" placeholder="Leave your review here..." onChange={(e) => setReviewText(e.target.value)}></textarea>
                </div>
                <div className="createReviewStarsDiv">
                    <div>
                        {errors?.errors?.stars && <a>Must give a star rating</a>}
                        {!clicked1 && <i className="fa-regular fa-star rev-star" onClick={() => {
                            setClicked1(true)
                            setStars(1)
                        }}></i>}
                        {clicked1 && <i className="fa-solid fa-star rev-star" onClick={() => {
                            setClicked1(true)
                            setClicked2(false)
                            setClicked3(false)
                            setClicked4(false)
                            setClicked5(false)
                        }}></i>}
                    </div>
                    <div>
                        {!clicked2 && <i className="fa-regular fa-star rev-star" onClick={() => {
                            setClicked1(true)
                            setClicked2(true)
                            setStars(2)
                        }}></i>}
                        {clicked2 && <i className="fa-solid fa-star rev-star" onClick={() => {
                            setClicked2(false)
                            setClicked3(false)
                            setClicked4(false)
                            setClicked5(false)
                        }}></i>}
                    </div>
                    <div>
                        {!clicked3 && <i className="fa-regular fa-star rev-star" onClick={() => {
                            setClicked1(true)
                            setClicked2(true)
                            setClicked3(true)
                            setStars(3)
                        }}></i>}
                        {clicked3 && <i className="fa-solid fa-star rev-star" onClick={() => {
                            setClicked3(false)
                            setClicked4(false)
                            setClicked5(false)
                        }}></i>}
                    </div>
                    <div>
                        {!clicked4 && <i className="fa-regular fa-star rev-star" onClick={() => {
                            setClicked1(true)
                            setClicked2(true)
                            setClicked3(true)
                            setClicked4(true)
                            setStars(4)
                        }}></i>}
                        {clicked4 && <i className="fa-solid fa-star rev-star" onClick={() => {
                            setClicked4(false)
                            setClicked5(false)
                        }}></i>}
                    </div>
                    <div>
                        {!clicked5 && <i className="fa-regular fa-star rev-star" onClick={() => {
                            setClicked1(true)
                            setClicked2(true)
                            setClicked3(true)
                            setClicked4(true)
                            setClicked5(true)
                            setStars(5)
                        }}></i>}
                        {clicked5 && <i className="fa-solid fa-star rev-star" onClick={() => {
                            setClicked5(false)
                        }}></i>}
                    </div>
                    <div>
                        <a id='starsText'>Stars</a>
                    </div>
                </div>
                <div id='createReviewButton'>
                    <button onClick={handleSubmit} id={(reviewText?.length <= 10 || stars === 0) ? 'disabledButton' : 'notDisabledButton'} disabled={reviewText?.length <= 10 || stars === 0}>Submit Your Review</button>
                </div>
            </div>
        </>
    )
}

export { CreateReviewModal };