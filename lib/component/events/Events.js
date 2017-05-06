import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import moment from "moment";

class Events extends Component {
	constructor(props) {
		super(props);
		this.renderEventCard = ::this.renderEventCard;
		this.mapEvent = ::this.mapEvent;
	}
	
	componentDidMount() {
		const {getAllEvents} = this.props;
		getAllEvents();
	}
	
	mapEvent(events) {
		return (
			<div className="events-card">
				{events.map(this.renderEventCard)}
			</div>
		);
	}
	
	renderEventCard(data, index) {
		return (
			<div key={index} className={"card-" + index }>
				<div className="wrapper">
					<div className="card radius shadowDepth1">
						<div className="card__content card__padding">
							
							<div className="card__meta">
								<time>{moment(data.startsAt).format('MMMM MM, YYYY - HH A')}</time>
							</div>
							
							<article className="card__article">
								<h2 className="card__title">{data.title}</h2>
								<p className="card__owner">{data.owner.firstName + " " + data.owner.lastName}</p>
								<p className="card__description">{data.description}</p>
							</article>
						</div>
						
						<div className="card__action">
							<div className="card__capacity">
								<div className="card__capacity-content">
									<span
										className="glyphicon glyphicon-user">{data.attendees.length + "of" + data.capacity}</span>
								</div>
							</div>
							<div className="card__subscribe">
								<FormGroup>
									<Button bsStyle="success" bsSize="small">Sign In</Button>
								</FormGroup>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	render() {
		const {events} = this.props;
		return (
			<div>
				<div>
					<p>Milos Nikolic</p>
				</div>
				{
					events && events.length && events !== null ? this.mapEvent(events) : null
				}
			</div>
		);
	}
}

Events.PropTypes = {
	"getAllEvents": PropTypes.func.required,
	"events": PropTypes.object,
	"eventDetail": PropTypes.object,
	"getSpecificEvent": PropTypes.func
};

export default injectIntl(Events);