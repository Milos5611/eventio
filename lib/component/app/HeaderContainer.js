import {IS_LOGGED_IN_KEY, USER_LAST_NAME, USER_FIRST_NAME, USER_ID} from "../../ducks/login";
import Header from "./Header";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
	return {
		"isLoggedIn": state.login[IS_LOGGED_IN_KEY],
		"lastName": state.login[USER_LAST_NAME],
		"firstName": state.login[USER_FIRST_NAME],
		"userId": state.login[USER_ID]
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
