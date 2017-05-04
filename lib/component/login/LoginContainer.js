import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    USERNAME_KEY,
    PASSWORD_KEY,
    USER_ID,
    doLogin,
    usernameChanged,
    passwordChanged
} from "../../ducks/login";

import Login from "./Login";

const mapStateToProps = (state) => {
    return {
        "username": state.login[USERNAME_KEY],
        "password": state.login[PASSWORD_KEY],
        "userId": state.login[USER_ID]
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        doLogin,
        usernameChanged,
        passwordChanged
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
