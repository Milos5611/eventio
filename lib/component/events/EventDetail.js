import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import EventBox from "../common/EventBox";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import EventCreate from "../common/EventCreate";
import FlatButton from "material-ui/FlatButton";

class EventDetail extends Component {
	constructor(props) {
		super(props);
		this.showEventDetail = ::this.showEventDetail;
		this.handleClose = ::this.handleClose;
		this.handleOpen = ::this.handleOpen;
	}
	
	componentDidMount() {
		const {loadEventDetails, eventDetail} = this.props;
		loadEventDetails(eventDetail);
	}
	
	handleOpen() {
		const {showCreateDialog} = this.props;
		showCreateDialog(true);
	}
	
	handleClose() {
		const {closeCreateDialog} = this.props;
		closeCreateDialog(false);
	}
	
	showEventDetail(data) {
		const {
			open, title, description, date, capacity, titleChanged,
			dateChanged, descriptionChanged, capacityChanged
		} = this.props;
		const actions = [
			<FlatButton
				label="Ok"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleClose}
			/>,
		];
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
				
				<EventCreate titleChanged={titleChanged} dateChanged={dateChanged}
				             descriptionChanged={descriptionChanged}
				             capacityChanged={capacityChanged}
				             title={title} description={description} date={date} capacity={capacity}
				             actions={actions} open={ open } onRequestClose={ this.handleClose.bind(this) }/>
				
				<FloatingActionButton onTouchTap={this.handleOpen} className="add-events--button">
					<ContentAdd />
				</FloatingActionButton>
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
	"loadEventDetails": PropTypes.func,
	"showCreateDialog": PropTypes.func,
	"closeCreateDialog": PropTypes.func,
	"open": PropTypes.bool,
	"title": PropTypes.string,
	"date": PropTypes.object,
	"description": PropTypes.string,
	"capacity": PropTypes.string,
	"titleChanged": PropTypes.func,
	"dateChanged": PropTypes.func,
	"descriptionChanged": PropTypes.func,
	"capacityChanged": PropTypes.func
};

export default injectIntl(EventDetail);