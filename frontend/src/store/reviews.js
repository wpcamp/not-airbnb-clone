import { csrfFetch } from "./csrf";




/** Action Type Constants: */
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

export const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId
})


/* Thunk Action Creators: */
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
        default:
            return state
    }
}

export default reviewsReducer;