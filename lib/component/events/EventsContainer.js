import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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
	capacityChanged,
	createEvent,
	attendEvent
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
		"capacity": state.events[CAPACITY]
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
		capacityChanged,
		createEvent,
		attendEvent
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);