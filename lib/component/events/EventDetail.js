import {injectIntl} from "react-intl";
import React, {PureComponent, PropTypes} from "react";
import EventBox from "../common/EventBox";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import EventCreate from "../common/EventCreate";
import FlatButton from "material-ui/FlatButton";
import Snackbar from "material-ui/Snackbar";
import Chip from "material-ui/Chip";

class EventDetail extends PureComponent {
	constructor(props) {
		super(props);
		this.showEventDetail = ::this.showEventDetail;
		this.handleClose = ::this.handleClose;
		this.handleOpen = ::this.handleOpen;
		this.handleCloseSnack = ::this.handleCloseSnack;
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
	
	handleCloseSnack() {
		const {closeSnackBar} = this.props;
		closeSnackBar()
	}
	
	showEventDetail(data) {
		const {
			open, title, description, date, capacity, titleChanged,
			dateChanged, descriptionChanged, capacityChanged, infoMessage, showInfoMessage,
			attended, unAttendEvent, attendEvent, newCreatedEvent
		} = this.props;
		console.log(newCreatedEvent);
		const actions = [
			<FlatButton
				label="Ok"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this.handleClose}
			/>,
		];
		const styles = {
			wrapper: {
				display: 'flex',
				flexWrap: 'wrap',
				float: "left",
				marginRight: "15px",
				marginBottom: "10px"
			},
			labelColor: {
				color: "#949ea8"
			}
		};
		return (
			<div className="events-detail">
				<div className="top__nav">
					<h6 className="att--detail">DETAIL EVENT: #{data.id}</h6>
				</div>
				
				<EventBox attendEvent={attendEvent} unAttendEvent={unAttendEvent} attended={attended} data={data}/>
				
				<div className="card- attendees">
					<h4>Attendees</h4>
					{data.attendees.map((att, index) => {
						return (
							<Chip key={index} style={styles.wrapper} labelStyle={styles.labelColor}>
								{att.firstName + " " + att.lastName}
							</Chip>
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
				
				<Snackbar open={showInfoMessage}
				          message={infoMessage}
				          autoHideDuration={3000}
				          onRequestClose={this.handleCloseSnack}/>
			
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
	"capacityChanged": PropTypes.func,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func,
	"attended": PropTypes.bool,
	"showInfoMessage": PropTypes.bool,
	"infoMessage": PropTypes.string,
	"closeSnackBar": PropTypes.func,
	"newCreatedEvent": PropTypes.func
};

export default injectIntl(EventDetail);