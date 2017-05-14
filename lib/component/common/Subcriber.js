import React, {
	PureComponent, PropTypes
} from "react";
import RaisedButton from "material-ui/RaisedButton";

const styles = {
	join_group: {
		backgroundColor: "#22d486",
		width: 100,
		height: 32,
		borderRadius: 4
	},
	leave_group: {
		backgroundColor: "#ff4081",
		width: 100,
		height: 32,
		borderRadius: 4
	},
	labelColor: {
		color: "#fff"
	}
};

class Subscriber extends PureComponent {
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
			<RaisedButton buttonStyle={!attended ? styles.join_group : styles.leave_group} className="btn-success"
			              label={attended ? "LEAVE" : "JOIN"} labelStyle={styles.labelColor}
			              onTouchTap={() => this.subscriber(id)}/>
		);
	}
}

Subscriber.PropTypes = {
	"titleChanged": PropTypes.func,
	"id": PropTypes.string,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func,
	"attended": PropTypes.bool
};

export default Subscriber;