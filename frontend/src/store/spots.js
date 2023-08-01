import { csrfFetch } from "./csrf"

/** Action Type Constants: */
export const GET_SPOTS = 'spots/GET_SPOTS'
export const GET_SPOT = 'spots/GET_SPOT'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'
export const REMOVE_SPOT = 'spots/REMOVE_SPOT'
export const CREATE_SPOT = 'spots/CREATE_SPOT'
export const MANAGE_SPOTS = 'spots/MANAGE_SPOTS'
export const CREATE_IMAGE = 'spots/CREATE_IMAGE'

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    };
};

export const manageSpots = (spots) => {
    return {
        type: MANAGE_SPOTS,
        spots
    }
}

export const createImage = (image) => ({
    type: CREATE_IMAGE,
    image
})

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
})

export const getSpot = (spot) => ({
    type: GET_SPOT,
    spot
})

export const updateSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

export const removeSpot = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
})


/* Thunk Action Creators: */

export const thunkGetSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (res.ok) {
        const spots = await res.json()
        dispatch(getSpots(spots.Spots))
    }
}


export const thunkManageSpots = () => async dispatch => {
    const res = await csrfFetch('/api/spots/current', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const spots = await res.json()
        dispatch(manageSpots(spots))
    }
}

export const thunkGetSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })

    if (res.ok) {
        const spot = await res.json()
        dispatch(getSpot(spot))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkRemoveSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeSpot(spotId))
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkUpdateSpot = (spot) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    })

    if (res.ok) {
        const updatedSpot = await res.json()
        dispatch(updateSpot(updatedSpot))
        return updatedSpot
    } else {
        const errors = await res.json()
        return errors
    }
}

export const thunkCreateSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    })

    if (res.ok) {
        const newSpot = await res.json();
        dispatch(createSpot(newSpot))
        return newSpot;
    }
    if (!res.ok) {
        const errors = await res.json()
        return errors;
    }
}

export const thunkCreateImage = (spotId, image) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
    })

    if (res.ok) {
        const newImage = await res.json()
        dispatch(createImage(newImage))
        return newImage;
    } else {
        const errors = await res.json()
        return errors
    }
}


/* spotReducer */

const spotsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case GET_SPOTS:
            const spotsState = {}
            action.spots.forEach((spot) => {
                spotsState[spot.id] = spot
            })
            return spotsState;
        case MANAGE_SPOTS:
            newState = {}
            action.spots.forEach((spot) => {
                newState[spot.id] = spot
            })
            return newState
        case GET_SPOT:
            newState = { ...state, [action.spot.id]: action.spot }
            return newState
        case CREATE_SPOT:
            newState = { ...state, [action.spot.id]: action.spot }
            return newState
        case REMOVE_SPOT:
            newState = { ...state }
            delete newState[action.spotId]
            return newState
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case CREATE_IMAGE:
            return {...state,[action.image.id]: action.image}
        default:
            return state
    }
}


export default spotsReducer;