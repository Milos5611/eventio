import {TYPE_KEY} from "../common/constant";
import {createErrorMessages, createSuccessMessages, messagesReceived} from "./message";
import history from "../common/history";
import rest from "../common/rest";


const RECIEVE_EVENT_LIST_ACTION = "RECIEVE_EVENT_LIST_ACTION";
const RECIEVE_EVENT_DETAIL_ACTION = "RECIEVE_EVENT_DETAIL_ACTION";

export const EVENT_LIST = "events";
export const EVENT_DETAIL = "eventDetail";

const initialState = {
	[EVENT_LIST]: null,
	[EVENT_DETAIL]: null
};

export default function reducer(state = initialState, action) {
	let newState;
	
	switch (action[TYPE_KEY]) {
		case RECIEVE_EVENT_LIST_ACTION:
			newState = Object.assign({}, state, {
				[EVENT_LIST]: action[EVENT_LIST]
			});
			break;
		case RECIEVE_EVENT_DETAIL_ACTION:
			newState = Object.assign({}, state, {
				[EVENT_DETAIL]: action[EVENT_DETAIL]
			});
			break;
		default:
			newState = Object.assign({}, state, {});
			break;
	}
	return newState;
}

export function getAllEvents() {
	return (dispatch) => {
		rest.doGet(
			`${window.strv.eventio.BASE_URL}/events`
		).then(eventList => {
			dispatch(recieveEventListSuccessful(eventList));
			dispatch(messagesReceived(createSuccessMessages("OK")));
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
		});
	};
}

export function getSpecificEvent() {
	return (dispatch, getState) => {
		rest.doGet(
			`${window.strv.eventio.BASE_URL}/events`, getState().events.id
		).then(event => {
			dispatch(recieveEventSuccessful(event));
			dispatch(messagesReceived(createSuccessMessages("OK")));
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
		});
	}
}

export function recieveEventListSuccessful(eventList) {
	return {
		[TYPE_KEY]: RECIEVE_EVENT_LIST_ACTION,
		[EVENT_LIST]: eventList
	}
}

export function recieveEventSuccessful(event) {
	return {
		[TYPE_KEY]: RECIEVE_EVENT_DETAIL_ACTION,
		[EVENT_DETAIL]: event
	}
}
