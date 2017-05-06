import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Events from "./Events";
import {EVENT_LIST, EVENT_DETAIL, loadEventDetails, getAllEvents} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"events": state.events[EVENT_LIST],
		"eventDetail": state.events[EVENT_DETAIL]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getAllEvents,
		loadEventDetails
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);