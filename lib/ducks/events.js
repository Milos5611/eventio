import {TYPE_KEY} from "../common/constant";
import history from "../common/history";
import rest from "../common/rest";


const RECIEVE_EVENT_LIST_ACTION = "RECIEVE_EVENT_LIST_ACTION";

export const EVENT_LIST = "events";

const initialState = {
	[EVENT_LIST]: null
};

export default function reducer(state = initialState, action) {
	let newState;
	
	switch (action[TYPE_KEY]) {
		case RECIEVE_EVENT_LIST_ACTION:
			newState = Object.assign({}, state, {
				[EVENT_LIST]: action[EVENT_LIST]
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
			dispatch(recieveEventListFail(JSON.parse(reason.responseText).error));
		});
	};
}

export function recieveEventListSuccessful(eventList) {
	return {
		[TYPE_KEY]: RECIEVE_EVENT_LIST_ACTION,
		[EVENT_LIST]: eventList
	}
}

export function recieveEventListFail() {

}
