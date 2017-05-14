import {TYPE_KEY} from "../common/constant";
import {createErrorMessages, messagesReceived} from "./message";
import rest from "../common/rest";

const SIGN_UP_SUCCESSFUL_ACTION = "SIGN_UP_SUCCESSFUL_ACTION";
const SIGN_UP_PASSWORD_CHANGED_ACTION = "SIGN_UP_PASSWORD_CHANGED_ACTION";
const SIGN_UP_PASSWORD_REPEAT_CHANGED_ACTION = "SIGN_UP_PASSWORD_REPEAT_CHANGED_ACTION";
const SIGN_UP_FIRST_NAME_CHANGED_ACTION = "SIGN_UP_FIRST_NAME_CHANGED_ACTION";
const SIGN_UP_LAST_NAME_CHANGED_ACTION = "SIGN_UP_LAST_NAME_CHANGED_ACTION";
const SIGN_UP_EMAIL_CHANGED_ACTION = "SIGN_UP_EMAIL_CHANGED_ACTION";
const SIGN_UP_FAIL_ACTION = "SIGN_UP_FAIL_ACTION";

export const USER_ID = "userId";
export const PASSWORD_KEY = "password";
export const PASSWORD_REPEAT_KEY = "passwordRepeat";
export const USER_FIRST_NAME = "firstName";
export const USER_LAST_NAME = "lastName";
export const USER_EMAIL = "email";
export const SIGN_UP_FAIL = "signUpFail";
export const SIGN_UP_OK = "signUpOk";
export const AUTH = "token";

const initialState = {
	[USER_ID]: "",
	[PASSWORD_KEY]: "",
	[PASSWORD_REPEAT_KEY]: "",
	[USER_FIRST_NAME]: "",
	[USER_LAST_NAME]: "",
	[USER_EMAIL]: "",
	[SIGN_UP_FAIL]: false,
	[SIGN_UP_OK]: false,
	[AUTH]: ""
};

export default function reducer(state = initialState, action) {
	let newState;
	
	switch (action[TYPE_KEY]) {
		
		case SIGN_UP_SUCCESSFUL_ACTION:
			newState = Object.assign({}, state, {
				[USER_FIRST_NAME]: action[USER_FIRST_NAME],
				[USER_LAST_NAME]: action[USER_LAST_NAME],
				[USER_EMAIL]: action[USER_EMAIL],
				[USER_ID]: action[USER_ID],
				[SIGN_UP_FAIL]: false,
				[SIGN_UP_OK]: true,
				[AUTH]: action[AUTH],
			});
			break;
		
		case SIGN_UP_PASSWORD_REPEAT_CHANGED_ACTION:
			newState = Object.assign({}, state, {
				[PASSWORD_KEY]: action[PASSWORD_KEY]
			});
			break;
		
		case SIGN_UP_PASSWORD_CHANGED_ACTION:
			newState = Object.assign({}, state, {
				[PASSWORD_REPEAT_KEY]: action[PASSWORD_REPEAT_KEY]
			});
			break;
		
		case SIGN_UP_FIRST_NAME_CHANGED_ACTION:
			newState = Object.assign({}, state, {
				[USER_FIRST_NAME]: action[USER_FIRST_NAME]
			});
			break;
		case SIGN_UP_LAST_NAME_CHANGED_ACTION:
			newState = Object.assign({}, state, {
				[USER_LAST_NAME]: action[USER_LAST_NAME]
			});
			break;
		case SIGN_UP_EMAIL_CHANGED_ACTION:
			newState = Object.assign({}, state, {
				[USER_EMAIL]: action[USER_EMAIL]
			});
			break;
		case SIGN_UP_FAIL_ACTION:
			newState = Object.assign({}, state, {
				[SIGN_UP_FAIL]: action[SIGN_UP_FAIL],
				[SIGN_UP_OK]: action[SIGN_UP_OK]
			});
			break;
		default:
			newState = Object.assign({}, state, {});
			break;
	}
	return newState;
}

//async actions
export function doSignUp() {
	return (dispatch, getState) => {
		rest.doSignUp(
			`${window.strv.eventio.BASE_URL}/users`,
			getState().signUp.firstName.trim(), getState().signUp.lastName.trim(),
			getState().signUp.email.trim(), getState().signUp.password
		).then(newUser => {
			if (newUser.user && newUser.auth) {
				dispatch(signUpSuccessful(newUser));
			}
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
			dispatch(signUpIsFail());
		});
	};
}

export function signUpSuccessful(newUser) {
	return {
		[TYPE_KEY]: SIGN_UP_SUCCESSFUL_ACTION,
		[USER_ID]: newUser.user.id,
		[USER_EMAIL]: newUser.user.email,
		[USER_FIRST_NAME]: newUser.user.firstName,
		[USER_LAST_NAME]: newUser.user.lastName,
		[AUTH]: newUser.auth
	};
}

export function signUpIsFail() {
	return {
		[TYPE_KEY]: SIGN_UP_FAIL_ACTION,
		[SIGN_UP_FAIL]: true,
		[SIGN_UP_OK]: false
	};
}

export function firstNameChanged(firstName) {
	return {
		[TYPE_KEY]: SIGN_UP_FIRST_NAME_CHANGED_ACTION,
		[USER_FIRST_NAME]: firstName,
	};
}

export function lastNameChanged(lastName) {
	return {
		[TYPE_KEY]: SIGN_UP_LAST_NAME_CHANGED_ACTION,
		[USER_LAST_NAME]: lastName,
	};
}

export function emailChanged(email) {
	return {
		[TYPE_KEY]: SIGN_UP_EMAIL_CHANGED_ACTION,
		[USER_EMAIL]: email,
	};
}

export function passwordChanged(password) {
	return {
		[TYPE_KEY]: SIGN_UP_PASSWORD_CHANGED_ACTION,
		[PASSWORD_KEY]: password
	};
}

export function passwordRepeatChanged(passwordRepeat) {
	return {
		[TYPE_KEY]: SIGN_UP_PASSWORD_REPEAT_CHANGED_ACTION,
		[PASSWORD_REPEAT_KEY]: passwordRepeat
	};
}