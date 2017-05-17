import { TYPE_KEY } from "../common/constant";
import { createErrorMessages, messagesReceived } from "./message";
import rest from "../common/rest";

const USER_EVENTS_RECEIVED__SUCCESSFUL_ACTION = "USER_EVENTS_RECEIVED__SUCCESSFUL_ACTION";

export const USER_EVENTS = "userEvents";

const initialState = {
    [USER_EVENTS]: null
};

export default function reducer( state = initialState, action ) {
    let newState;

    switch ( action[ TYPE_KEY ] ) {

        case USER_EVENTS_RECEIVED__SUCCESSFUL_ACTION:
            newState = Object.assign({}, state, {
                [USER_EVENTS]: action[ USER_EVENTS ]
            });
            break;
        default:
            newState = Object.assign({}, state, {});
            break;
    }
    return newState;
}

export function getUserSpecificEvents() {
    return ( dispatch, getState ) => {
        let userId = getState().login.userId;
        let userEvents = getState().events.events.filter(event => event.owner.id === userId);

        dispatch(successfulReceivedUserEvents(userEvents));
    }
}

export function successfulReceivedUserEvents( userEvents ) {
    return {
        [TYPE_KEY]: USER_EVENTS_RECEIVED__SUCCESSFUL_ACTION,
        [USER_EVENTS]: userEvents
    }
}