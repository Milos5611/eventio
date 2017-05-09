import {injectIntl} from "react-intl";
import React, {PureComponent, PropTypes} from "react";
import EventBox from "../common/EventBox";

class Events extends PureComponent {
	constructor(props) {
		super(props);
		this.renderEventCard = ::this.renderEventCard;
		this.mapEvents = ::this.mapEvents;
	}
	
	componentDidMount() {
		const {getAllEvents} = this.props;
		getAllEvents();
	}
	
	mapEvents(events) {
		return (events.map(this.renderEventCard));
	}
	
	renderEventCard(data, index) {
		const {loadEventDetails} = this.props;
		return (
			<EventBox data={data} key={index} index={index} loadEventDetails={loadEventDetails}/>
		);
	}
	
	render() {
		const {events} = this.props;
		return (
			<div className="events-card">
				{
					events && events.length && events !== null ? this.mapEvents(events) : null
				}
			</div>
		);
	}
}

Events.PropTypes = {
	"getAllEvents": PropTypes.func.required,
	"events": PropTypes.object.required,
	"loadEventDetails": PropTypes.func.required
};

export default injectIntl(Events);