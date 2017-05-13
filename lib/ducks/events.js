import {TYPE_KEY, HTTP_STATUS_CREATED} from "../common/constant";
import {createErrorMessages, messagesReceived} from "./message";
import history from "../common/history";
import rest from "../common/rest";

const RECIEVE_EVENT_LIST_ACTION = "RECIEVE_EVENT_LIST_ACTION";
const RECIEVE_EVENT_DETAIL_ACTION = "RECIEVE_EVENT_DETAIL_ACTION";
const CREATE_EVENT_ACTION = "CREATE_EVENT_ACTION";
const SHOW_GRID_VIEW = "SHOW_GRID_VIEW";
const SHOW_LIST_VIEW = "SHOW_LIST_VIEW";

export const EVENT_LIST = "events";
export const EVENT_DETAIL = "eventDetail";
export const GRID = "grid";
export const LIST = "list";
export const ACTIVE_EVENTS = "activeEvents";
export const ALL_EVENTS = "allEvents";
export const FEATURE_EVENTS = "featureEvents";
export const PAST_EVENTS = "pastEvents";


const initialState = {
	[EVENT_LIST]: null,
	[EVENT_DETAIL]: null,
	[GRID]: true,
	[LIST]: false,
	[ACTIVE_EVENTS]: {
		[ALL_EVENTS]: true,
		[FEATURE_EVENTS]: false,
		[PAST_EVENTS]: false
	}
};

export default function reducer(state = initialState, action) {
	let newState;
	
	switch (action[TYPE_KEY]) {
		case RECIEVE_EVENT_LIST_ACTION:
			newState = Object.assign({}, state, {
				[EVENT_LIST]: action[EVENT_LIST], [ACTIVE_EVENTS]: action[ACTIVE_EVENTS]
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
		case SHOW_GRID_VIEW:
			newState = Object.assign({}, state, {
				[GRID]: action[GRID], [LIST]: action[LIST]
			});
			break;
		case SHOW_LIST_VIEW:
			newState = Object.assign({}, state, {
				[GRID]: action[GRID], [LIST]: action[LIST]
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
			dispatch(recieveEventListSuccessful(eventList, true, false, false));
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
		});
	};
}

export function getFeatureEvents() {
	return (dispatch) => {
		rest.doGet(
			`${window.strv.eventio.BASE_URL}/events`
		).then(eventList => {
			try {
				let events = eventList.map(events => {
					return (
						Date.parse(events.startsAt) > new Date().getDate() ?
							events : null
					)
				});
				dispatch(recieveEventListSuccessful(events, false, true, false));
			} catch (e) {
				dispatch(messagesReceived(createErrorMessages(e)));
			}
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
		});
	};
}

export function getPastEvents() {
	return (dispatch) => {
		rest.doGet(
			`${window.strv.eventio.BASE_URL}/events`
		).then(eventList => {
			try {
				let events = eventList.map(events => {
					return (
						Date.parse(events.startsAt) <= new Date().getDate() ?
							events : null
					)
				});
				dispatch(recieveEventListSuccessful(events, false, false, true));
			} catch (e) {
				dispatch(messagesReceived(createErrorMessages(e)));
			}
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

export function recieveEventListSuccessful(eventList, allEvents = true, featureEvents = false, pastEvents = false) {
	return {
		[TYPE_KEY]: RECIEVE_EVENT_LIST_ACTION,
		[EVENT_LIST]: eventList,
		[ACTIVE_EVENTS]: {
			[ALL_EVENTS]: allEvents,
			[FEATURE_EVENTS]: featureEvents,
			[PAST_EVENTS]: pastEvents
		}
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

export function showGridView() {
	return {
		[TYPE_KEY]: SHOW_GRID_VIEW,
		[GRID]: true,
		[LIST]: false
	}
}

export function showListView() {
	return {
		[TYPE_KEY]: SHOW_LIST_VIEW,
		[GRID]: false,
		[LIST]: true
	}
}

