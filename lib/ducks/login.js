import {TYPE_KEY} from "../common/constant";
import {createErrorMessages, createSuccessMessages, messagesReceived} from "./message";
import history from "../common/history";
import rest from "../common/rest";

const LOGIN_SUCCESSFUL_ACTION = "LOGIN_SUCCESSFUL_ACTION";
const PASSWORD_CHANGED_ACTION = "LOGIN_PASSWORD_CHANGED_ACTION";
const USERNAME_CHANGED_ACTION = "LOGIN_USERNAME_CHANGED_ACTION";
const SHOW_HIDE_PASSWORD_ACTION = "SHOW_HIDE_PASSWORD_ACTION";
const LOGIN_FAIL_ACTION = "LOGIN_FAIL_ACTION";

export const USERNAME_KEY = "username";
export const PASSWORD_KEY = "password";
export const USER_ID = "userId";
export const USER_FIRST_NAME = "firstName";
export const USER_LAST_NAME = "lastName";
export const SHOW_HIDE_CHANGE = "showPassword";
export const LOGIN_FAIL = "loginFail";
export const IS_LOGGED_IN_KEY = "isLoggedIn";
export const AUTH = "token";

const initialState = {
	[USERNAME_KEY]: "",
	[PASSWORD_KEY]: "",
	[USER_ID]: "",
	[USER_FIRST_NAME]: "",
	[USER_LAST_NAME]: "",
	[SHOW_HIDE_CHANGE]: false,
	[LOGIN_FAIL]: false,
	[IS_LOGGED_IN_KEY]: false,
	[AUTH]: ""
};

export default function reducer(state = initialState, action) {
	let newState;
	
	switch (action[TYPE_KEY]) {
		
		case LOGIN_SUCCESSFUL_ACTION:
			newState = Object.assign({}, state, {
				[USERNAME_KEY]: "",
				[PASSWORD_KEY]: "",
				[USER_ID]: action[USER_ID],
				[USER_FIRST_NAME]: action[USER_FIRST_NAME],
				[USER_LAST_NAME]: action[USER_LAST_NAME],
				[LOGIN_FAIL]: false,
				[IS_LOGGED_IN_KEY]: true,
				[AUTH]: action[AUTH],
			});
			break;
		
		case PASSWORD_CHANGED_ACTION:
			newState = Object.assign({}, state, {
				[PASSWORD_KEY]: action[PASSWORD_KEY]
			});
			break;
		
		case USERNAME_CHANGED_ACTION:
			newState = Object.assign({}, state, {
				[USERNAME_KEY]: action[USERNAME_KEY]
			});
			break;
		case SHOW_HIDE_PASSWORD_ACTION:
			newState = Object.assign({}, state, {
				[SHOW_HIDE_CHANGE]: action[SHOW_HIDE_CHANGE]
			});
			break;
		case LOGIN_FAIL_ACTION:
			newState = Object.assign({}, state, {
				[LOGIN_FAIL]: action[LOGIN_FAIL]
			});
			break;
		default:
			newState = Object.assign({}, state, {});
			break;
	}
	return newState;
}

//async actions
export function doLogin() {
	return (dispatch, getState) => {
		rest.doLogin(
			`${window.strv.eventio.BASE_URL}/auth/native`, getState().login.username.trim(), getState().login.password
		).then(currentUser => {
			if (currentUser.user && currentUser.auth) {
				dispatch(loginSuccessful(currentUser));
			}
		}, reason => {
			dispatch(messagesReceived(createErrorMessages(reason)));
			dispatch(loginFail());
		});
	};
}

export function loginSuccessful(currentUser) {
	return {
		[TYPE_KEY]: LOGIN_SUCCESSFUL_ACTION,
		[USER_ID]: currentUser.user.id,
		[USERNAME_KEY]: currentUser.user.email,
		[USER_FIRST_NAME]: currentUser.user.firstName,
		[USER_LAST_NAME]: currentUser.user.lastName,
		[AUTH]: currentUser.auth
	};
}

export function loginFail() {
	return {
		[TYPE_KEY]: LOGIN_FAIL_ACTION,
		[LOGIN_FAIL]: true
	};
}

export function usernameChanged(username) {
	return {
		[TYPE_KEY]: USERNAME_CHANGED_ACTION,
		[USERNAME_KEY]: username,
	};
}

export function passwordChanged(password) {
	return {
		[TYPE_KEY]: PASSWORD_CHANGED_ACTION,
		[PASSWORD_KEY]: password
	};
}

export function showHide(type) {
	return {
		[TYPE_KEY]: SHOW_HIDE_PASSWORD_ACTION,
		[SHOW_HIDE_CHANGE]: !type,
	};
}
