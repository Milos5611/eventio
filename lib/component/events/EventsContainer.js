import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import Events from "./Events";
import {EVENT_LIST,getAllEvents} from "../../ducks/events";

const mapStateToProps = (state) => {
	return {
		"events": state.events[EVENT_LIST]
	}
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getAllEvents
	}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);