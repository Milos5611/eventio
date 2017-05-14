import {injectIntl} from "react-intl";
import React, {PureComponent, PropTypes} from "react";
import moment from "moment";
import RaisedButton from 'material-ui/RaisedButton';

class EventBox extends PureComponent {
	constructor(props) {
		super(props);
		this.renderEventCardGrid = ::this.renderEventCardGrid;
		this.loadEventDetail = ::this.loadEventDetail;
	}
	
	loadEventDetail(data) {
		const {loadEventDetails} = this.props;
		loadEventDetails(data);
	}
	
	renderEventCardGrid(data, index) {
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
								<time>{moment(data.startsAt).format("MMMM DD, YYYY - HH A")}</time>
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
								              label="JOIN" primary={true} onTouchTap={() => this.props.attendEvent(data.id)}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	renderEventCardList(data, index) {
		const style = {
			backgroundColor: "#22d486",
			width: 100,
			height: 32,
			borderRadius: 4
		};
		return (
			<div key={index} className={"card-" + (index ? index : "") + " list-view"}>
				<div className="wrapper">
					<div className="card radius shadowDepth1">
						<div className="card__content">
							<article className="card__article">
								<a onClick={() => this.loadEventDetail(data)}>
									<h2 className="card__title">{data.title}</h2>
								</a>
								<p className="card__description">{data.description}</p>
								<p className="card__owner">{data.owner.firstName + " " + data.owner.lastName}</p>
								<div className="card__meta">
									<time>{moment(data.startsAt).format("MMMM DD, YYYY - HH A")}</time>
								</div>
								<span className="user">{data.attendees.length + " of " + data.capacity}</span>
								<div className="card__subscribe">
									<RaisedButton buttonStyle={style} className="btn-success"
									              label="JOIN" primary={true}
									              onTouchTap={() => this.props.attendEvent(data.id)}/>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>
		);
	}
	
	render() {
		const {data, index, list} = this.props;
		return ((data && data !== null) && list ?
			this.renderEventCardList(data, index) : (data && data !== null) ?
				this.renderEventCardGrid(data, index) : null);
	}
}

EventBox.PropTypes = {
	"getAllEvents": PropTypes.func.required,
	"events": PropTypes.object.required,
	"data": PropTypes.object.required,
	"index": PropTypes.number.required,
	"loadEventDetails": PropTypes.func,
	"list": PropTypes.bool,
	"attendEvent": PropTypes.func
};

export default injectIntl(EventBox);