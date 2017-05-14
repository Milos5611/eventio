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
	loadEventDetails,
	showCreateDialog,
	closeCreateDialog,
	titleChanged,
	descriptionChanged,
	dateChanged,
	capacityChanged,
	attendEvent
} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"eventDetail": state.events[EVENT_DETAIL],
		"open": state.events[OPEN],
		"title": state.events[TITLE],
		"description": state.events[DESCRIPTION],
		"date": state.events[DATE],
		"capacity": state.events[CAPACITY]
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
		attendEvent
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);