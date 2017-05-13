import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import EventBox from "../common/EventBox";

class EventDetail extends Component {
	constructor(props) {
		super(props);
		this.showEventDetail = ::this.showEventDetail;
	}
	
	componentDidMount() {
		const {loadEventDetails, eventDetail} = this.props;
		loadEventDetails(eventDetail);
	}
	
	showEventDetail(data) {
		return (
			<div className="events-detail">
				<div className="top__nav">
					<h6 className="att--detail">DETAIL EVENT: #{data.id}</h6>
				</div>
				
				<EventBox data={data}/>
				
				<div className="card- attendees">
					<h4>Attendees</h4>
					{data.attendees.map((att, index) => {
						return (
							<span key={index} className="chip-wrapper">
								<span className="chip-wrapper-text">{att.firstName + " " + att.lastName}</span>
							</span>
						);
					})}
				</div>
			</div>
		);
	}
	
	render() {
		const {eventDetail} = this.props;
		return (eventDetail && eventDetail !== null ? this.showEventDetail(eventDetail) : null);
	}
}

EventDetail.PropTypes = {
	"eventDetail": PropTypes.object,
	"loadEventDetails": PropTypes.func
};

export default injectIntl(EventDetail);