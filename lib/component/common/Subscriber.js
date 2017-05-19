import React, {PureComponent, PropTypes} from "react";
import {injectIntl} from "react-intl";
import RaisedButton from "material-ui/RaisedButton";
import {style} from "../../common/constant";

class Subscriber extends PureComponent {
	constructor(props) {
		super(props);
		this.subscriberForEvent = ::this.subscriberForEvent;
		this.onEditEvent = ::this.onEditEvent;
		this.buttonLabel = ::this.buttonLabel;
	}
	
	subscriberForEvent(id) {
		const {attended, attendEvent, unAttendEvent} = this.props;
		!attended ? attendEvent(id) : unAttendEvent(id)
	}
	
	onEditEvent(data) {
		const {loadEventDetails} = this.props;
		loadEventDetails(data);
	}
	
	buttonLabel(data) {
		const {attended, userId, intl} = this.props;
		return data.owner.id === userId ? intl.formatMessage({"id": "button.edit"}) :
			attended ? intl.formatMessage({"id": "button.leave"}) : intl.formatMessage({"id": "button.join"});
	}
	
	render() {
		const {data, attended, userId} = this.props;
		return (
			<RaisedButton buttonStyle={
				data.owner.id === userId ?
					style.subscriber.edit_group : !attended ?
					style.subscriber.join_group : style.subscriber.leave_group}
			              className="btn-success"
			              label={this.buttonLabel(data)}
			              labelStyle={style.subscriber.labelColor}
			              onTouchTap={() => data.owner.id === userId ?
				              this.onEditEvent(data) : this.subscriberForEvent(data.id)}/>
		);
	}
}

Subscriber.PropTypes = {
	"data": PropTypes.object,
	"userId": PropTypes.string,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func,
	"loadEventDetails": PropTypes.func,
	"intl": PropTypes.object
};

export default injectIntl(Subscriber);