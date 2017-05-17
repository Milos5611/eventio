import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import EventBox from "../common/EventBox";
import Snackbar from "material-ui/Snackbar";
import Chip from "material-ui/Chip";

class EventDetail extends Component {
	constructor(props) {
		super(props);
		this.showEventDetail = ::this.showEventDetail;
		this.handleClose = ::this.handleClose;
		this.handleCloseSnack = ::this.handleCloseSnack;
	}
	
	componentDidMount() {
		const {loadEventDetails, eventDetail} = this.props;
		loadEventDetails(eventDetail);
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
			infoMessage, showInfoMessage,
			unAttendEvent, attendEvent, userId
		} = this.props;
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
				
				<EventBox userId={userId} attendEvent={attendEvent} unAttendEvent={unAttendEvent} data={data}
				          eventDetail={true}/>
				
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
	"title": PropTypes.string,
	"date": PropTypes.object,
	"description": PropTypes.string,
	"attendEvent": PropTypes.func,
	"unAttendEvent": PropTypes.func,
	"showInfoMessage": PropTypes.bool,
	"infoMessage": PropTypes.string,
	"closeSnackBar": PropTypes.func,
	"userId": PropTypes.string
};

export default injectIntl(EventDetail);