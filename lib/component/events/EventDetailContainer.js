import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import EventDetail from "./EventDetail";
import {
	EVENT_DETAIL,
	OPEN,
	TITLE,
	DESCRIPTION,
	DATE,
	CAPACITY,
	ATTENDED,
	SHOW_INFO_MESSAGE,
	INFO_MESSAGE,
	loadEventDetails,
	showCreateDialog,
	closeCreateDialog,
	titleChanged,
	descriptionChanged,
	dateChanged,
	capacityChanged,
	attendEvent,
	unAttendEvent,
	closeSnackBar
} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"eventDetail": state.events[EVENT_DETAIL],
		"open": state.events[OPEN],
		"title": state.events[TITLE],
		"description": state.events[DESCRIPTION],
		"date": state.events[DATE],
		"capacity": state.events[CAPACITY],
		"attended": state.events[ATTENDED],
		"showInfoMessage": state.events[SHOW_INFO_MESSAGE],
		"infoMessage": state.events[INFO_MESSAGE]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadEventDetails,
		showCreateDialog,
		closeCreateDialog,
		titleChanged,
		descriptionChanged,
		dateChanged,
		capacityChanged,
		attendEvent,
		unAttendEvent,
		closeSnackBar
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);