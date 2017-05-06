import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import Button from "react-bootstrap/lib/Button";
import FormGroup from "react-bootstrap/lib/FormGroup";
import moment from "moment";

class EventDetail extends Component {
	constructor(props) {
		super(props);
		debugger
		this.showEventDetail = ::this.showEventDetail;
	}
	
	componentDidMount() {
		const {loadEventDetails, eventDetail} = this.props;
		loadEventDetails(eventDetail);
	}
	
	showEventDetail(data) {
		const {loadEventDetails} = this.props;
		return (
			<div className={"card-"}>
				<div className="wrapper">
					<div className="card radius shadowDepth1">
						<div className="card__content card__padding">
							
							<div className="card__meta">
								<time>{moment(data.startsAt).format('MMMM MM, YYYY - HH A')}</time>
							</div>
							
							<article className="card__article">
								<a onClick={() => loadEventDetails(data)}>
									<h2 className="card__title">{data.title}</h2>
								</a>
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
		const {eventDetail} = this.props;
		return (
			<div>
				<div>
					<p>Milos</p>
				</div>
				{
					eventDetail && eventDetail.length && eventDetail !== null ? this.showEventDetail(eventDetail) : null
				}
			</div>
		);
	}
}

EventDetail.PropTypes = {
	"eventDetail": PropTypes.object,
	"loadEventDetails": PropTypes.func
};

export default injectIntl(EventDetail);