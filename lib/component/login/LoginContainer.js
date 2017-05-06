import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
	USERNAME_KEY,
	PASSWORD_KEY,
	SHOW_HIDE_CHANGE,
	USER_ID,
	LOGIN_FAIL,
	IS_LOGGED_IN_KEY,
	doLogin,
	showHide,
	usernameChanged,
	passwordChanged
} from "../../ducks/login";

import Login from "./Login";

const mapStateToProps = (state) => {
	return {
		"username": state.login[USERNAME_KEY],
		"password": state.login[PASSWORD_KEY],
		"userId": state.login[USER_ID],
		"showPassword": state.login[SHOW_HIDE_CHANGE],
		"loginFail": state.login[LOGIN_FAIL],
		"isLoggedIn": state.login[IS_LOGGED_IN_KEY]
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		doLogin,
		showHide,
		usernameChanged,
		passwordChanged
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
