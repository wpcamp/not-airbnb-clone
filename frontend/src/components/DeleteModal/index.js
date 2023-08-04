import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveSpot, thunkGetSpot} from "../../store/spots";
import { thunkRemoveReview } from "../../store/reviews";
import { useHistory} from "react-router-dom";
import { csrfFetch } from "../../store/csrf";
import "./DeleteModal.css";


function DeleteSpotModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const keepSpot = (e) => {
        e.preventDefault()
        closeModal()
    }

    const deleteSpot = (e, spotId) => {
        e.preventDefault()
        dispatch(thunkRemoveSpot(spotId))
        closeModal()
    }

    return (
        <>
            <div id='deleteModal'>
                <div className="deleteModalHeader">Confirm Delete</div>
                <div className="deleteModalSecondaryText">
                    <a id='deleteModalSecondaryText'>Are you sure you want to remove this spot from the listings?</a>
                </div>
                <div id="yesNoButtons">
                    <button type="submit" id='deleteModalYesButton' onClick={(e) => deleteSpot(e, spotId)}>Yes (Delete Spot)</button>
                    <button type="submit" id='deleteModalNoButton' onClick={keepSpot}>No (Keep Spot)</button>
                </div>
            </div>
        </>
    );
}

function DeleteReviewModal({ reviewId, spotId, reviewFunc }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()
    const keepReview = (e) => {
        e.preventDefault()
        closeModal()
    }
    
    const deleteReview = async (e, reviewId) => {
        e.preventDefault()
        await dispatch(thunkRemoveReview(reviewId))
        closeModal()
        reviewFunc(spotId)
        dispatch(thunkGetSpot(spotId))
    }

    return (
        <>
            <div id='deleteModal'>
                <div className="deleteModalHeader">Confirm Delete</div>
                <div className="deleteModalSecondaryText">
                    <a id='deleteModalSecondaryText'>Are you sure you want to remove this review from the listings?</a>
                </div>
                <div id="yesNoButtons">
                    <button type="submit" id='deleteModalYesButton' onClick={(e) => {
                        deleteReview(e, reviewId)
                        dispatch(thunkGetSpot(spotId))
                        }}>Yes (Delete Review)</button>
                    <button type="submit" id='deleteModalNoButton' onClick={keepReview}>No (Keep Review)</button>
                </div>
            </div>
        </>
    );
}


export {DeleteSpotModal, DeleteReviewModal};