import { csrfFetch } from "./csrf";




/** Action Type Constants: */
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'



/** Action Creators: */

export const updateReview = (review) => ({  
    type: UPDATE_REVIEW,
    review
})

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})


/* Thunk Action Creators: */

export const thunkUpdateReview = (review) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review), 
    })
    if (res.ok) {
        const updatedReview = await res.json()
        dispatch(updateReview(updatedReview))
        return updatedReview
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkRemoveReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeReview(reviewId))
    }else{
        const errors = await res.json()
        return errors
    }
}


/* Reducer */
const reviewsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case REMOVE_REVIEW:
            newState = {...state}
            delete newState[action.reviewId]
            return newState
        case UPDATE_REVIEW:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState
        default:
            return state
    }
}

export default reviewsReducer;