import React, {
	Component, PropTypes
} from "react";
import RaisedButton from "material-ui/RaisedButton";
import { style } from "../../common/constant";

class Subscriber extends Component {
	constructor(props) {
		super(props);
		this.subscriber = ::this.subscriber;
	}
	
	subscriber(id) {
		const {attended, attendEvent, unAttendEvent} = this.props;
		!attended ? attendEvent(id) : unAttendEvent(id)
	}
	
	render() {
		const {id, attended} = this.props;
		return (
			<RaisedButton buttonStyle={!attended ? style.subscriber.join_group : style.subscriber.leave_group} className="btn-success"
			              label={attended ? "LEAVE" : "JOIN"} labelStyle={style.subscriber.labelColor}
			              onTouchTap={() => this.subscriber(id)}/>
		);
	}
}

Subscriber.PropTypes = {
	"titleChanged": PropTypes.func,
	"id": PropTypes.string,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func,
};

export default Subscriber;