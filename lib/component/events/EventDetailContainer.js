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
	closeSnackBar,
	titleChanged,
	descriptionChanged,
	dateChanged,
	timeChanged,
	capacityChanged,
	removeEvent,
	updateEvent
} from "../../ducks/events";
import {USER_ID} from "../../ducks/login";

const mapStateToProps = (state) => {
	return {
		"eventDetail": state.events[EVENT_DETAIL],
		"showInfoMessage": state.events[SHOW_INFO_MESSAGE],
		"infoMessage": state.events[INFO_MESSAGE],
		"userId": state.login[USER_ID]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadEventDetails,
		attendEvent,
		unAttendEvent,
		closeSnackBar,
		titleChanged,
		descriptionChanged,
		dateChanged,
		timeChanged,
		capacityChanged,
		removeEvent,
		updateEvent
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);