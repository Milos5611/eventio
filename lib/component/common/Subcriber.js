import React, {PureComponent, PropTypes} from "react";
import RaisedButton from "material-ui/RaisedButton";
import EventEdit from "./EventEdit";
import {style} from "../../common/constant";

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
		const {data, attended, userId} = this.props;
		return (
			<RaisedButton buttonStyle={
				data.owner.id === userId ?
					style.subscriber.edit_group : !attended ?
					style.subscriber.join_group : style.subscriber.leave_group}
			              className="btn-success"
			              label={data.owner.id === userId ? "EDIT" : attended ? "LEAVE" : "JOIN"}
			              labelStyle={style.subscriber.labelColor}
			              onTouchTap={() => data.owner.id === userId ?
				              <EventEdit data={data}/> : this.subscriber(data.id)}/>
		);
	}
}

Subscriber.PropTypes = {
	"data": PropTypes.object,
	"userId": PropTypes.string,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func
};

export default Subscriber;