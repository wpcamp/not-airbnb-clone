import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveSpot} from "../../store/spots";
import { thunkRemoveReview } from "../../store/reviews";
import { useHistory} from "react-router-dom";
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

function DeleteReviewModal({ reviewId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()
    const keepReview = (e) => {
        e.preventDefault()
        closeModal()
    }

    const deleteReview = (e, reviewId) => {
        e.preventDefault()
        dispatch(thunkRemoveReview(reviewId))
        closeModal()
        history.go(0)
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
                        }}>Yes (Delete Review)</button>
                    <button type="submit" id='deleteModalNoButton' onClick={keepReview}>No (Keep Review)</button>
                </div>
            </div>
        </>
    );
}


export {DeleteSpotModal, DeleteReviewModal};