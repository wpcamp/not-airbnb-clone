
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkRemoveSpot, thunkGetSpots } from "../../store/spots";
import "./DeleteModal.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function DeleteModal({ spotId }) {
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

export default DeleteModal;