import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import EventBox from "../common/EventBox";
import EventNavigation from "../events/EventNavigation";
import Avatar from 'material-ui/Avatar';
import {style} from "../../common/constant";

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.renderEventCard = ::this.renderEventCard;
		this.mapEvents = ::this.mapEvents;
	}
	
	componentDidMount() {
		const {getUserSpecificEvents} = this.props;
		getUserSpecificEvents();
	}
	
	get fullName() {
		return this.props.firstName + " " + this.props.lastName
	}
	
	get initials() {
		return this.props.firstName.substr(0, 1) + this.props.lastName.substr(0, 1);
	}
	
	get username() {
		return this.props.username;
	}
	
	mapEvents(events) {
		return (events.map(this.renderEventCard));
	}
	
	renderEventCard(data, index) {
		const {attendEvent, unAttendEvent, userId, grid, list, loadEventDetails} = this.props;
		return (
			<EventBox data={data} key={index} index={index} list={list}
			          grid={grid} attendEvent={attendEvent}
			          unAttendEvent={unAttendEvent}
			          userId={userId} loadEventDetails={loadEventDetails}/>
		);
	}
	
	render() {
		const {userEvents, showListView, showGridView, grid, list, getUserSpecificEvents} = this.props;
		return (
			<div className="user-profile--container">
				<div className="user-profile--header">
					<Avatar
						size={120}
						style={style.userProfile}>
						{this.initials}
					</Avatar>
					<div className="user-profile--user">
						<h4 className="user-profile__name">{this.fullName}</h4>
						<h4 className="user-profile__email">{this.username}</h4>
					</div>
				</div>
				<div className="event-box--navigation">
					<EventNavigation grid={grid} list={list} showListView={showListView}
					                 showGridView={showGridView} getAllEvents={getUserSpecificEvents}
					                 userProfile="My Events"/>
				</div>
				<div className="user-profile">
					{userEvents && userEvents.length ? this.mapEvents(userEvents) : null}
				</div>
			</div>
		);
	}
}

UserProfile.PropTypes = {
	"getUserSpecificEvents": PropTypes.func,
	"userEvents": PropTypes.object,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func,
	"showInfoMessage": PropTypes.bool,
	"infoMessage": PropTypes.string,
	"closeSnackBar": PropTypes.func,
	"userId": PropTypes.string,
	"showGridView": PropTypes.func,
	"showListView": PropTypes.func,
	"loadEventDetails": PropTypes.func,
	"grid": PropTypes.bool,
	"list": PropTypes.bool,
	"firstName": PropTypes.string,
	"lastName": PropTypes.string,
	"username": PropTypes.string
};

export default injectIntl(UserProfile);