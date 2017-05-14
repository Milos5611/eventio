import {injectIntl} from "react-intl";
import React, {PureComponent, PropTypes} from "react";
import EventBox from "../common/EventBox";
import EventNavigation from "./EventNavigation";
import {injectProps} from "relpers";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EventCreate from "../common/EventCreate";
import RaisedButton from "material-ui/RaisedButton";

class Events extends PureComponent {
	constructor(props) {
		super(props);
		this.renderEventCard = ::this.renderEventCard;
		this.mapEvents = ::this.mapEvents;
		this.handleOpen = ::this.handleOpen;
		this.handleClose = ::this.handleClose;
	}
	
	componentDidMount() {
		const {getAllEvents} = this.props;
		getAllEvents();
	}
	
	handleOpen() {
		const {showCreateDialog} = this.props;
		showCreateDialog(true);
	}
	
	handleClose(data) {
		const {createEvent} = this.props;
		createEvent(data);
	}
	
	mapEvents(events) {
		return (events.map(this.renderEventCard));
	}
	
	renderEventCard(data, index) {
		const {loadEventDetails, list, grid, attendEvent} = this.props;
		return (
			<EventBox data={data} key={index} index={index} loadEventDetails={loadEventDetails} grid={grid}
			          list={list} attendEvent={attendEvent}/>
		);
	}
	
	@injectProps
	render({
		       events, getAllEvents, getFeatureEvents, getPastEvents, showListView, showGridView,
		       grid, list, activeEvents, open, title, description, date, capacity, titleChanged,
		       dateChanged, descriptionChanged, capacityChanged, createEvent
	       }) {
		const style = {
			backgroundColor: "#22d486",
			width: 200,
			height: 36,
			marginTtop: 30,
			textAlign: "center"
		};
		const actions = [
			<RaisedButton buttonStyle={style} className="btn-success"
			              label="CREATE NEW EVENT" primary={true} keyboardFocused={true}
			              onTouchTap={this.handleClose}/>
		];
		return (
			<div className="event--body">
				<div className="event-box--navigation">
					<EventNavigation getAllEvents={getAllEvents} getFeatureEvents={getFeatureEvents}
					                 getPastEvents={getPastEvents} grid={grid} list={list}
					                 showListView={showListView} showGridView={showGridView}
					                 activeEvents={activeEvents}/>
				</div>
				<div className="events-card">
					{
						events && events.length && events !== null ? this.mapEvents(events) : null
					}
				</div>
				<EventCreate titleChanged={titleChanged} dateChanged={dateChanged}
				             descriptionChanged={descriptionChanged}
				             capacityChanged={capacityChanged} createEvent={createEvent}
				             title={title} description={description} date={date} capacity={capacity}
				             actions={actions} open={ open } onRequestClose={this.handleClose}/>
				
				<FloatingActionButton onTouchTap={this.handleOpen} className="add-events--button">
					<ContentAdd />
				</FloatingActionButton>
			</div>
		);
	}
}

Events.PropTypes = {
	"getAllEvents": PropTypes.func.required,
	"getFeatureEvents": PropTypes.func,
	"getPastEvents": PropTypes.func,
	"events": PropTypes.object.required,
	"loadEventDetails": PropTypes.func.required,
	"grid": PropTypes.bool,
	"list": PropTypes.bool,
	"activeEvents": PropTypes.object,
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
	"capacityChanged": PropTypes.func,
	"createEvent": PropTypes.func.isRequired,
	"attendEvent": PropTypes.func
};

export default injectIntl(Events);