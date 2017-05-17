import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import UserProfile from "./UserProfile";
import {
    USER_EVENTS,
    getUserSpecificEvents
} from "../../ducks/userProfile";
import {
    LIST,
    GRID,
    EVENT_DETAIL,
    showGridView,
    showListView,
    unAttendEvent,
    attendEvent,
    loadEventDetails
} from "../../ducks/events";
import {
    USER_ID,
    USER_FIRST_NAME,
    USER_LAST_NAME,
    USERNAME_KEY
} from "../../ducks/login";

const mapStateToProps = ( state ) => {
    return {
        "userEvents": state.userProfile[ USER_EVENTS ],
        "grid": state.events[ GRID ],
        "list": state.events[ LIST ],
        "userId": state.login[ USER_ID ],
        "eventDetail": state.events[ EVENT_DETAIL ],
        "lastName": state.login[ USER_LAST_NAME ],
        "firstName": state.login[ USER_FIRST_NAME ],
        "username": state.login[ USERNAME_KEY ]
    }
};

const mapDispatchToProps = ( dispatch ) => {
    return bindActionCreators({
        getUserSpecificEvents,
        showGridView,
        showListView,
        unAttendEvent,
        attendEvent,
        loadEventDetails
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);