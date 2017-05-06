import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import EventDetail from "./EventDetail";
import { EVENT_DETAIL, loadEventDetails} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"eventDetail": state.events[EVENT_DETAIL]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadEventDetails
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);