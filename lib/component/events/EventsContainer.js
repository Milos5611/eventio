import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {USER_ID} from "../../ducks/login";

import Events from "./Events";
import {
	EVENT_LIST,
	EVENT_DETAIL,
	GRID,
	LIST,
	ACTIVE_EVENTS,
	OPEN,
	TITLE,
	DESCRIPTION,
	DATE,
	CAPACITY,
	SHOW_INFO_MESSAGE,
	INFO_MESSAGE,
	NEW_CREATED_EVENT,
	TIME,
	loadEventDetails,
	getAllEvents,
	getFeatureEvents,
	getPastEvents,
	showGridView,
	showListView,
	showCreateDialog,
	closeCreateDialog,
	titleChanged,
	descriptionChanged,
	dateChanged,
	timeChanged,
	capacityChanged,
	createEvent,
	attendEvent,
	unAttendEvent,
	closeSnackBar
} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"events": state.events[EVENT_LIST],
		"eventDetail": state.events[EVENT_DETAIL],
		"grid": state.events[GRID],
		"list": state.events[LIST],
		"activeEvents": state.events[ACTIVE_EVENTS],
		"open": state.events[OPEN],
		"title": state.events[TITLE],
		"description": state.events[DESCRIPTION],
		"date": state.events[DATE],
		"time": state.events[TIME],
		"capacity": state.events[CAPACITY],
		"showInfoMessage": state.events[SHOW_INFO_MESSAGE],
		"infoMessage": state.events[INFO_MESSAGE],
		"newCreatedEvent": state.events[NEW_CREATED_EVENT],
		"userId": state.login[USER_ID]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getAllEvents,
		loadEventDetails,
		getFeatureEvents,
		getPastEvents,
		showGridView,
		showListView,
		showCreateDialog,
		closeCreateDialog,
		titleChanged,
		descriptionChanged,
		dateChanged,
		timeChanged,
		capacityChanged,
		createEvent,
		attendEvent,
		unAttendEvent,
		closeSnackBar
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);