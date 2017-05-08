import {TYPE_KEY, HTTP_STATUS_CREATED} from "../common/constant";
import {createErrorMessages, messagesReceived} from "./message";
import history from "../common/history";
import rest from "../common/rest";

const RECIEVE_EVENT_LIST_ACTION = "RECIEVE_EVENT_LIST_ACTION";
const RECIEVE_EVENT_DETAIL_ACTION = "RECIEVE_EVENT_DETAIL_ACTION";
const CREATE_EVENT_ACTION = "CREATE_EVENT_ACTION";

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
		case CREATE_EVENT_ACTION:
			newState = Object.assign({}, state, {
				[EVENT_LIST]: [EVENT_LIST].push(action[EVENT_LIST])
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
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
		});
	};
}

export function loadEventDetails(data) {
	return (dispatch, getState) => {
		data && data.id || getState() ? rest.doGet(
			`${window.strv.eventio.BASE_URL}/events/${data.id}`
		).then(event => {
			dispatch(recieveEventSuccessful(event));
			history.push("detail")
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
		}) : null;
	}
}

export function createEvent(data) {
	return (dispatch) => {
		rest.doPost(
			`${window.strv.eventio.BASE_URL}/events/`, eventToCreate
		).then(createdEvent => {
			dispatch(recieveCreatedEventSuccessful(createdEvent));
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
		})
	}
}

export function updateEvent(event) {
	return (dispatch) => {
		event && event.id ?
			rest.doPatch(
				`${window.strv.eventio.BASE_URL}/events/${event.id}`, eventToUpdate
			).then(createdEvent => {
				dispatch(recieveCreatedEventSuccessful(createdEvent));
			}, reason => {
				dispatch(messagesReceived(createErrorMessages(reason)));
			}) : null;
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

export function recieveCreatedEventSuccessful(event) {
	return {
		[TYPE_KEY]: CREATE_EVENT_ACTION,
		[EVENT_DETAIL]: event
	}
}
