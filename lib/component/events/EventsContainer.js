import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Events from "./Events";
import {
	EVENT_LIST,
	EVENT_DETAIL,
	GRID,
	LIST,
	ACTIVE_EVENTS,
	loadEventDetails,
	getAllEvents,
	getFeatureEvents,
	getPastEvents,
	showGridView,
	showListView
} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"events": state.events[EVENT_LIST],
		"eventDetail": state.events[EVENT_DETAIL],
		"grid": state.events[GRID],
		"list": state.events[LIST],
		"activeEvents": state.events[ACTIVE_EVENTS]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getAllEvents,
		loadEventDetails,
		getFeatureEvents,
		getPastEvents,
		showGridView,
		showListView
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);