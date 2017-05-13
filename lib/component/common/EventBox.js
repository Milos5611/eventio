import {injectIntl} from "react-intl";
import React, {PureComponent, PropTypes} from "react";
import moment from "moment";
import RaisedButton from 'material-ui/RaisedButton';

class EventBox extends PureComponent {
	constructor(props) {
		super(props);
		this.renderEventCard = ::this.renderEventCard;
		this.loadEventDetail = ::this.loadEventDetail;
	}
	
	loadEventDetail(data) {
		const {loadEventDetails} = this.props;
		loadEventDetails(data);
	}
	
	renderEventCard(data, index) {
		const style = {
				backgroundColor: "#22d486",
				width: 100,
				height: 32,
				borderRadius: 4
			},
			userIcon = "/images/icon-user.png";
		return (
			<div key={index} className={"card-" + (index ? index : "") }>
				<div className="wrapper">
					<div className="card radius shadowDepth1">
						<div className="card__content card__padding">
							
							<div className="card__meta">
								<time>{moment(data.startsAt).format("MMMM MM, YYYY - HH A")}</time>
							</div>
							
							<article className="card__article">
								<a onClick={() => this.loadEventDetail(data)}>
									<h2 className="card__title">{data.title}</h2>
								</a>
								<p className="card__owner">{data.owner.firstName + " " + data.owner.lastName}</p>
								<p className="card__description">{data.description}</p>
							</article>
						</div>
						
						<div className="card__action">
							<div className="card__capacity">
								<div className="card__capacity-content">
									<img src={userIcon} alt="User icon"/>
									<span className="user">{data.attendees.length + " of " + data.capacity}</span>
								</div>
							</div>
							<div className="card__subscribe">
								<RaisedButton buttonStyle={style} className="btn-success"
								              label="JOIN" primary={true}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	render() {
		const {data, index} = this.props;
		return (data && data !== null ? this.renderEventCard(data, index) : null);
	}
}

EventBox.PropTypes = {
	"getAllEvents": PropTypes.func.required,
	"events": PropTypes.object.required,
	"data": PropTypes.object.required,
	"index": PropTypes.number.required,
	"loadEventDetails": PropTypes.func
};

export default injectIntl(EventBox);