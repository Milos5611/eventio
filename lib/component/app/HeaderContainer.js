import { IS_LOGGED_IN_KEY } from "../../ducks/login";
import Header from "./Header";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const mapStateToProps = ( state ) => {
    return {
        "isLoggedIn": state.login[ IS_LOGGED_IN_KEY ]
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({
    
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
