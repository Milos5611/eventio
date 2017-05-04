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
export const USER_FIRST_NAME = "firstName";
export const USER_LAST_NAME = "lastname";

const initialState = {
	[USERNAME_KEY]: "",
	[PASSWORD_KEY]: "",
	[EMAIl_KEY]: "",
	[USER_ID]: "",
	[USER_FIRST_NAME]:"",
	[USER_LAST_NAME]:""
};

export default function reducer(state = initialState, action) {
	let newState;
	
	switch (action[TYPE_KEY]) {
		
		case LOGIN_SUCCESSFUL_ACTION:
			newState = Object.assign({}, state, {
				[USERNAME_KEY]: "",
				[PASSWORD_KEY]: "",
				[USER_ID]: action[USER_ID],
				[EMAIl_KEY]: action[EMAIl_KEY],
				[USER_FIRST_NAME]: action[USER_FIRST_NAME],
				[USER_LAST_NAME]: action[USER_LAST_NAME]
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
		rest.doLogin(
			`${window.strv.eventio.BASE_URL}/auth/native`, getState().login.username.trim(), getState().login.password
		).then(currentUser => {
			dispatch(loginSuccessful(currentUser));
			history.push("/userArea/templates");
		}, reason => {
			console.log(reason);
		});
	};
}

//sync actions
export function loginSuccessful(user) {
	return {
		[TYPE_KEY]: LOGIN_SUCCESSFUL_ACTION,
		[USER_ID]: user.id,
		[EMAIl_KEY]: user.email,
		[USER_FIRST_NAME]: user.firstName,
		[USER_LAST_NAME]: user.lastName
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
