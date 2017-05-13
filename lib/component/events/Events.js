import {injectIntl} from "react-intl";
import React, {PureComponent, PropTypes} from "react";
import EventBox from "../common/EventBox";
import EventNavigation from "./EventNavigation";
import {injectProps} from "relpers";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

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
		const {loadEventDetails, list, grid} = this.props;
		return (
			<EventBox data={data} key={index} index={index} loadEventDetails={loadEventDetails} grid={grid}
			          list={list}/>
		);
	}
	
	@injectProps
	render({events, getAllEvents, getFeatureEvents, getPastEvents, showListView, showGridView, grid, list, activeEvents}) {
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
				<FloatingActionButton className="add-events--button">
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
	"activeEvents": PropTypes.object
};

export default injectIntl(Events);