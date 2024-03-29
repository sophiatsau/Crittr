import { fetchData, normalizeObj } from "./utils";
import {
	SET_USER,
	REMOVE_USER,
	START_ORDER,
	ADD_TO_BAG,
	UPDATE_BAG,
	EMPTY_BAG,
	REMOVE_FROM_BAG
} from "./constants";

/************* ACTIONS **************** */
export const updateBag = (detail) => ({
	type: UPDATE_BAG,
	detail
})

export const removeFromBag = (payload) => ({
	type: REMOVE_FROM_BAG,
	payload
})

/********************** THUNKS ************** */
export const thunkUpdateBag = (detail) => async (dispatch) => {
	const data = await fetchData(`/api/order-details/${detail.id}/update`, {
		method: 'PATCH',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(detail),
	});

	if (data.status===200) {
		dispatch(updateBag(data.detail));
	}

	return data
}

export const thunkRemoveFromBag = (detailId) => async (dispatch) => {
	const data = await fetchData(`/api/order-details/${detailId}/delete`, {
		method: 'DELETE',
	});

	if (data.status===200) {
		dispatch(removeFromBag(data));
	}

	return data
}

/******** GETTER */
const initialState = {
}

export default function reducer(state=initialState, action) {
    switch (action.type) {
		case SET_USER: {
            //only need details for bag initially
			if (!action.payload || !action.payload.bag) {
                return state
            }
			const detailList = action.payload.bag.details
			detailList.forEach(detail => delete detail.critter)
			const details = action.payload.bag ? normalizeObj(detailList) : initialState
			return details
		}
		case REMOVE_USER: {
			return initialState
		}
		case START_ORDER: {
			const newDetails = normalizeObj(action.order.details)
			return {
				...state,
				...newDetails
			}
		}
		case ADD_TO_BAG: {
			const newDetail = {...action.detail}
			delete newDetail.critter
			return {
				...state,
				[action.detail.id]: newDetail
			}
		}
		case UPDATE_BAG: {
			const newDetails = {...action.detail}
			delete newDetails.order
			return {
				...state,
				[action.detail.id]: newDetails
			}
		}
		case EMPTY_BAG: {
			const stateList = Object.values(state)
			const orderId = parseInt(action.orderId)
			return normalizeObj(stateList.filter(detail => detail.orderId !== orderId))
		}
		case REMOVE_FROM_BAG: {
			const newState = {...state}
			delete newState[action.payload.removedDetail]
			return newState
		}
        default:
            return state;
    }
}
