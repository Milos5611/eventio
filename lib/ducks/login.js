import {TYPE_KEY} from "../common/constant";
import history from "../common/history";
import rest from "../common/rest";

const LOGIN_SUCCESSFUL_ACTION = "LOGIN_LOGIN_SUCCESSFUL_ACTION";
const PASSWORD_CHANGED_ACTION = "LOGIN_PASSWORD_CHANGED_ACTION";
const USERNAME_CHANGED_ACTION = "LOGIN_USERNAME_CHANGED_ACTION";

export const USERNAME_KEY = "username";
export const PASSWORD_KEY = "password";
export const EMAIl_KEY = "email";
export const USER_ID = "userId";

const initialState = {
	[USERNAME_KEY]: "",
	[PASSWORD_KEY]: "",
	[EMAIl_KEY]: "",
	[USER_ID]: ""
};

export default function reducer(state = initialState, action) {
	let newState;
	
	switch (action[TYPE_KEY]) {
		
		case LOGIN_SUCCESSFUL_ACTION:
			newState = Object.assign({}, state, {
				[USERNAME_KEY]: "",
				[PASSWORD_KEY]: "",
				[USER_ID]: action[USER_ID],
				[EMAIl_KEY]: action[EMAIl_KEY]
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
		default:
			newState = Object.assign({}, state, {});
			break;
	}
	return newState;
}

//async actions
export function doLogin() {
	return (dispatch, getState) => {
		let body = {
			"email": getState().login.username,
			"password": getState().login.password
		};
		rest.doLogin(
			`${window.strv.eventio}/${JSON.stringify(body)}`
		).then(currentUser => {
			dispatch(loginSuccessful(result.token, result.links, currentUser.identifier, roles));
		}, reason => {
		
		});
	};
}

//sync actions
export function loginSuccessful(user) {
	return {
		[TYPE_KEY]: LOGIN_SUCCESSFUL_ACTION,
		[USER_ID]: userid
	};
}

export function usernameChanged(username) {
	return {
		[TYPE_KEY]: USERNAME_CHANGED_ACTION,
		[USERNAME_KEY]: username
	};
}

export function passwordChanged(password) {
	return {
		[TYPE_KEY]: PASSWORD_CHANGED_ACTION,
		[PASSWORD_KEY]: password
	};
}
