import { TYPE_KEY } from "../common/constant";
import { createErrorMessages, messagesReceived } from "./message";
import history from "../common/history";
import rest from "../common/rest";
import moment from "moment";

const RECIEVE_EVENT_LIST_ACTION = "RECIEVE_EVENT_LIST_ACTION";
const RECIEVE_EVENT_DETAIL_ACTION = "RECIEVE_EVENT_DETAIL_ACTION";
const SHOW_GRID_VIEW = "SHOW_GRID_VIEW";
const SHOW_LIST_VIEW = "SHOW_LIST_VIEW";
const SHOW_CREATE_DIALOG = "SHOW_CREATE_DIALOG";
const CLOSE_CREATE_DIALOG = "CLOSE_CREATE_DIALOG";
const TITLE_CHANGED_ACTION = "TITLE_CHANGED_ACTION";
const DESCRIPTION_CHANGED_ACTION = "DESCRIPTION_CHANGED_ACTION";
const DATE_CHANGED_ACTION = "DATE_CHANGED_ACTION";
const TIME_CHANGED_ACTION = "TIME_CHANGED_ACTION";
const CAPACITY_CHANGED_ACTION = "CAPACITY_CHANGED_ACTION";
const SUCCESSFULLY_ATTENDED = "SUCCESSFULLY_ATTENDED";
const SUCCESSFULLY_UNATTENDED = "SUCCESSFULLY_UNATTENDED";
const NEW_EVENT_SUCCESSFULLY_CREATED = "NEW_EVENT_SUCCESSFULLY_CREATED";
const CLOSE_SNACK_BAR = "CLOSE_SNACK_BAR";
const INFO_MESSAGE_ACTION = "INFO_MESSAGE_ACTION";

export const EVENT_LIST = "events";
export const EVENT = "event";
export const EVENT_DETAIL = "eventDetail";
export const GRID = "grid";
export const LIST = "list";
export const ACTIVE_EVENTS = "activeEvents";
export const ALL_EVENTS = "allEvents";
export const FEATURE_EVENTS = "featureEvents";
export const PAST_EVENTS = "pastEvents";
export const OPEN = "open";
export const TITLE = "title";
export const DESCRIPTION = "description";
export const DATE = "date";
export const TIME = "time";
export const CAPACITY = "capacity";
export const SHOW_INFO_MESSAGE = "showInfoMessage";
export const INFO_MESSAGE = "infoMessage";
export const NEW_CREATED_EVENT = "newCreatedEvent";

const initialState = {
    [EVENT_LIST]: null,
    [OPEN]: false,
    [EVENT_DETAIL]: null,
    [GRID]: true,
    [LIST]: false,
    [ACTIVE_EVENTS]: {
        [ALL_EVENTS]: true,
        [FEATURE_EVENTS]: false,
        [PAST_EVENTS]: false
    },
    [NEW_CREATED_EVENT]: {
        [TITLE]: "",
        [DESCRIPTION]: "",
        [DATE]: null,
        [TIME]: null,
        [CAPACITY]: "",
    },
    [SHOW_INFO_MESSAGE]: false,
    [INFO_MESSAGE]: "",
    [EVENT]: null
};

export default function reducer( state = initialState, action ) {
    let newState;

    switch ( action[ TYPE_KEY ] ) {
        case RECIEVE_EVENT_LIST_ACTION:
            newState = Object.assign({}, state, {
                [EVENT_LIST]: action[ EVENT_LIST ], [ACTIVE_EVENTS]: action[ ACTIVE_EVENTS ]
            });
            break;
        case RECIEVE_EVENT_DETAIL_ACTION:
            newState = Object.assign({}, state, {
                [EVENT_DETAIL]: action[ EVENT_DETAIL ]
            });
            break;
        case SHOW_GRID_VIEW:
            newState = Object.assign({}, state, {
                [GRID]: action[ GRID ], [LIST]: action[ LIST ]
            });
            break;
        case SHOW_LIST_VIEW:
            newState = Object.assign({}, state, {
                [GRID]: action[ GRID ], [LIST]: action[ LIST ]
            });
            break;
        case SHOW_CREATE_DIALOG:
            newState = Object.assign({}, state, {
                [OPEN]: action[ OPEN ]
            });
            break;
        case CLOSE_CREATE_DIALOG:
            newState = Object.assign({}, state, {
                [OPEN]: action[ OPEN ],
                [TITLE]: "",
                [DESCRIPTION]: "",
                [DATE]: null,
                [TIME]: null,
                [CAPACITY]: "",
            });
            break;
        case TITLE_CHANGED_ACTION:
            newState = Object.assign({}, state, {
                [state[ EVENT_DETAIL ][ TITLE ]]: action[ TITLE ]
            });
            break;
        case DESCRIPTION_CHANGED_ACTION:
            newState = Object.assign({}, state, {
                [DESCRIPTION]: action[ DESCRIPTION ]
            });
            break;
        case DATE_CHANGED_ACTION:
            newState = Object.assign({}, state, {
                [DATE]: action[ DATE ]
            });
            break;
        case TIME_CHANGED_ACTION:
            newState = Object.assign({}, state, {
                [TIME]: action[ TIME ]
            });
            break;
        case CAPACITY_CHANGED_ACTION:
            newState = Object.assign({}, state, {
                [CAPACITY]: action[ CAPACITY ]
            });
            break;
        case SUCCESSFULLY_ATTENDED:
            newState = Object.assign({}, state, {
                [SHOW_INFO_MESSAGE]: action[ SHOW_INFO_MESSAGE ],
                [INFO_MESSAGE]: action[ INFO_MESSAGE ]
            });
            break;
        case SUCCESSFULLY_UNATTENDED:
            newState = Object.assign({}, state, {
                [SHOW_INFO_MESSAGE]: action[ SHOW_INFO_MESSAGE ],
                [INFO_MESSAGE]: action[ INFO_MESSAGE ]
            });
            break;
        case CLOSE_SNACK_BAR:
            newState = Object.assign({}, state, {
                [SHOW_INFO_MESSAGE]: action[ SHOW_INFO_MESSAGE ]
            });
            break;
        case NEW_EVENT_SUCCESSFULLY_CREATED:
            newState = Object.assign({}, state, {
                [NEW_CREATED_EVENT]: action[ EVENT ]
            });
            break;
        case INFO_MESSAGE_ACTION:
            newState = Object.assign({}, state, {
                [INFO_MESSAGE]: action[ INFO_MESSAGE ],
                [SHOW_INFO_MESSAGE]: action[ SHOW_INFO_MESSAGE ],
            });
            break;
        default:
            newState = Object.assign({}, state, {});
            break;
    }
    return newState;
}

export function getAllEvents() {
    return ( dispatch, getState ) => {
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
    return ( dispatch ) => {
        rest.doGet(
            `${window.strv.eventio.BASE_URL}/events`
        ).then(eventList => {
            try {
                let events = eventList.map(events => {
                    return (
                        events.startsAt > moment().toISOString() ?
                            events : null
                    )
                });
                dispatch(recieveEventListSuccessful(events, false, true, false));
            } catch ( e ) {
                dispatch(messagesReceived(createErrorMessages(e)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        });
    };
}

export function getPastEvents() {
    return ( dispatch ) => {
        rest.doGet(
            `${window.strv.eventio.BASE_URL}/events`
        ).then(eventList => {
            try {
                let events = eventList.map(events => {
                    return (
                        events.startsAt <= moment().toISOString() ?
                            events : null
                    )
                });
                dispatch(recieveEventListSuccessful(events, false, false, true));
            } catch ( e ) {
                dispatch(messagesReceived(createErrorMessages(e)));
            }
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        });
    };
}

export function loadEventDetails( data ) {
    return ( dispatch, getState ) => {
        data && data.id || getState() ? rest.doGet(
            `${window.strv.eventio.BASE_URL}/events/${data.id}`
        ).then(event => {
            dispatch(recieveEventSuccessful(event));
            history.push("detail");
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        }) : null;
    }
}

export function createEvent() {
    return ( dispatch, getState ) => {
        let momentTime = moment(getState().events.time);
        let momentDate = moment(getState().events.date);
        let renderedDateTime = moment({
            year: momentDate.year(),
            month: momentDate.month(),
            day: momentDate.date(),
            hour: momentTime.hours(),
            minute: momentTime.minutes()
        });
        const newChore = {
            date_time: renderedDateTime,
        };
        let data = {
            title: getState().events.title,
            description: getState().events.description,
            startsAt: newChore.date_time,
            capacity: isNaN(getState().events.capacity) ? 1 : getState().events.capacity
        };
        let token = getState().login.token;
        dispatch(closeCreateDialog(false));
        rest.doPost(
            `${window.strv.eventio.BASE_URL}/events/`, data, token
        ).then(createdEvent => {
            dispatch(createNewEvent(createdEvent));
            try {
                let event = getState().events.events;
                let newEvent = getState().events.newCreatedEvent;
                event.push(newEvent);
                dispatch(recieveEventListSuccessful(event, true, false, false));
            } catch ( e ) {
                dispatch(infoMessage(e.message));
            }
        }, reason => {
            dispatch(infoMessage(JSON.parse(reason.responseText).errors.map(error => (error.message + " "))));
        })
    }
}

export function updateEvent( eventId ) {
    return ( dispatch, getState ) => {
        let momentTime = moment(getState().events.eventDetail.time);
        let momentDate = moment(getState().events.eventDetail.date);
        let renderedDateTime = moment({
            year: momentDate.year(),
            month: momentDate.month(),
            day: momentDate.date(),
            hour: momentTime.hours(),
            minute: momentTime.minutes()
        });
        const newChore = {
            date_time: renderedDateTime,
        };
        let data = {
            title: getState().events.eventDetail.title,
            description: getState().events.eventDetail.description,
            startsAt: newChore.date_time,
            capacity: isNaN(getState().events.eventDetail.capacity) ? 1 : getState().events.eventDetail.capacity
        };
        let token = getState().login.token;
        eventId ? rest.doPatch(
            `${window.strv.eventio.BASE_URL}/events/${eventId}`, data, token
        ).then(createdEvent => {
            let updatedEvent = createdEvent;
        }, reason => {
            dispatch(messagesReceived(createErrorMessages(reason)));
        }) : null;
    }
}

export function attendEvent( eventId ) {
    return ( dispatch, getState ) => {
        let token = getState().login.token;
        eventId && token ? rest.doPost(
            `${window.strv.eventio.BASE_URL}/events/${eventId}/attendees/me`, "", token
        ).then(attendedEvent => {
            try {
                let oldEvent = getState().events.events.filter(event => event.id === eventId)[ 0 ];
                let newEvent = Object.assign(oldEvent, attendedEvent);
                dispatch(recieveEventSuccessful(newEvent));
                dispatch(attendedSuccessfully(newEvent));
            } catch ( e ) {
                dispatch(infoMessage(e.message));
            }
        }, reason => {
            let startsAt = JSON.parse(reason.responseText).errors.startsAt;
            startsAt ? dispatch(infoMessage("This event is expired, please look for some feature events")) :
                dispatch(infoMessage(JSON.parse(reason.responseText).errors.attendees.message));
        }) : null;
    }
}

export function unAttendEvent( eventId ) {
    return ( dispatch, getState ) => {
        let token = getState().login.token;
        eventId && token ? rest.doDelete(
            `${window.strv.eventio.BASE_URL}/events/${eventId}/attendees/me`, token
        ).then(attendedEvent => {
            try {
                let oldEvent = getState().events.events.filter(event => event.id === eventId)[ 0 ];
                let newEvent = Object.assign(oldEvent, attendedEvent);
                dispatch(recieveEventSuccessful(newEvent));
                dispatch(unAttendedSuccessfully(newEvent));
            } catch ( e ) {
                dispatch(infoMessage(e.message));
            }
        }, reason => {
            dispatch(infoMessage(JSON.parse(reason.responseText).errors.attendees.message));
        }) : null;
    }
}

export function removeEvent( eventId ) {
    return ( dispatch, getState ) => {
        let token = getState().login.token;
        eventId && token ? rest.doDelete(
            `${window.strv.eventio.BASE_URL}/events/${eventId}`, token
        ).then(() => {
            history.goBack();
            dispatch(infoMessage("You have successfully remove event"));
        }, reason => {
            dispatch(infoMessage(JSON.parse(reason.responseText).errors.attendees.message));
        }) : null;
    }
}

export function attendedSuccessfully( event ) {
    return {
        [TYPE_KEY]: SUCCESSFULLY_ATTENDED,
        [SHOW_INFO_MESSAGE]: true,
        [INFO_MESSAGE]: "You have successfully attended event " + "'" + event.title + "'"
    }
}

export function unAttendedSuccessfully( event ) {
    return {
        [TYPE_KEY]: SUCCESSFULLY_UNATTENDED,
        [SHOW_INFO_MESSAGE]: true,
        [INFO_MESSAGE]: "You have successfully unattended event " + "'" + event.title + "'"
    }
}

export function recieveEventListSuccessful( eventList, allEvents = true, featureEvents = false, pastEvents = false ) {
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

export function recieveEventSuccessful( event ) {
    return {
        [TYPE_KEY]: RECIEVE_EVENT_DETAIL_ACTION,
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

export function showCreateDialog( show ) {
    return {
        [TYPE_KEY]: SHOW_CREATE_DIALOG,
        [OPEN]: show
    }
}

export function closeCreateDialog( show ) {
    return {
        [TYPE_KEY]: CLOSE_CREATE_DIALOG,
        [OPEN]: show
    }
}

export function titleChanged( title ) {
    return {
        [TYPE_KEY]: TITLE_CHANGED_ACTION,
        [TITLE]: title
    };
}

export function descriptionChanged( description ) {
    return {
        [TYPE_KEY]: DESCRIPTION_CHANGED_ACTION,
        [DESCRIPTION]: description
    };
}

export function dateChanged( date ) {
    return {
        [TYPE_KEY]: DATE_CHANGED_ACTION,
        [DATE]: date
    };
}

export function timeChanged( date ) {
    return {
        [TYPE_KEY]: TIME_CHANGED_ACTION,
        [TIME]: date
    };
}

export function capacityChanged( capacity ) {
    return {
        [TYPE_KEY]: CAPACITY_CHANGED_ACTION,
        [CAPACITY]: capacity
    };
}

export function closeSnackBar() {
    return {
        [TYPE_KEY]: CLOSE_SNACK_BAR,
        [SHOW_INFO_MESSAGE]: false
    };
}

export function createNewEvent( event ) {
    return {
        [TYPE_KEY]: NEW_EVENT_SUCCESSFULLY_CREATED,
        [EVENT]: event
    };
}

export function infoMessage( message ) {
    return {
        [TYPE_KEY]: INFO_MESSAGE_ACTION,
        [INFO_MESSAGE]: message,
        [SHOW_INFO_MESSAGE]: true
    }
}

