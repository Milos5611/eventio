import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import EventDetail from "./EventDetail";
import {
	EVENT_DETAIL,
	SHOW_INFO_MESSAGE,
	INFO_MESSAGE,
	loadEventDetails,
	attendEvent,
	unAttendEvent,
	closeSnackBar
} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"eventDetail": state.events[EVENT_DETAIL],
		"showInfoMessage": state.events[SHOW_INFO_MESSAGE],
		"infoMessage": state.events[INFO_MESSAGE]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadEventDetails,
		attendEvent,
		unAttendEvent,
		closeSnackBar
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);