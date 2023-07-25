
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveSpot, thunkGetSpots } from "../../store/spots";
import "./DeleteModal.css";
import { useEffect } from "react";
import { thunkRemoveReview } from "../../store/reviews";
import { useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {forceUpdate} from 'react'



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
                        history.push(-1)
                        }}>Yes (Delete Review)</button>
                    <button type="submit" id='deleteModalNoButton' onClick={keepReview}>No (Keep Review)</button>
                </div>
            </div>
        </>
    );
}


export {DeleteSpotModal, DeleteReviewModal};