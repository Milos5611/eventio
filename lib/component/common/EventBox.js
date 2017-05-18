import { injectIntl } from "react-intl";
import React, { Component, PropTypes } from "react";
import moment from "moment";
import Subscriber from "./Subscriber";

class EventBox extends Component {
    constructor( props ) {
        super(props);
        this.renderEventCardGrid = ::this.renderEventCardGrid;
        this.loadEventDetail = ::this.loadEventDetail;
        this.isUserAttended = ::this.isUserAttended;
    }

    loadEventDetail( data ) {
        const { loadEventDetails } = this.props;
        loadEventDetails(data);
    }

    isUserAttended( data, userId ) {
        return data.attendees.some(user => user.id === userId)
    }

    renderEventCardGrid( data, index ) {
        const { eventDetail, userId } = this.props;
        return (
            <div key={index} className={"card-" + (index ? index : "") }>
                <div className="wrapper">
                    <div className="card radius shadowDepth1">
                        <div className="card__content card__padding">

                            <div className="card__meta">
                                <time>{moment(data.startsAt).format("MMMM DD, YYYY - HH A")}</time>
                            </div>

                            <article className="card__article">
                                {!eventDetail ?
                                    <a onClick={() => this.loadEventDetail(data)}>
                                        <h2 className="card__title">{data.title}</h2>
                                    </a> :
                                    <a>
                                        <h2 className="card__title">{data.title}</h2>
                                    </a>
                                }
                                <p className="card__owner">{data.owner.firstName + " " + data.owner.lastName}</p>
                                <p className="card__description">{data.description}</p>
                            </article>
                        </div>

                        <div className="card__action">
                            <div className="card__capacity">
                                <div className="card__capacity-content">
                                    <span className="icon-user"/>
                                    <span className="user">{data.attendees.length + " of " + data.capacity}</span>
                                </div>
                            </div>
                            <div className="card__subscribe">
                                <Subscriber attended={this.isUserAttended(data, userId)}
                                            {...this.props}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderEventCardList( data, index ) {
        const { userId } = this.props;
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
                                    <Subscriber attended={this.isUserAttended(data, userId)}
                                                {...this.props}/>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { data, index, list } = this.props;
        return ((data && data !== null) && list ?
            this.renderEventCardList(data, index) : (data && data !== null) ?
                this.renderEventCardGrid(data, index) : null);
    }
}

EventBox.PropTypes = {
    "events": PropTypes.object.required,
    "data": PropTypes.object.required,
    "index": PropTypes.number.required,
    "loadEventDetails": PropTypes.func,
    "list": PropTypes.bool,
    "attendEvent": PropTypes.func,
    "unAttendEvent": PropTypes.func,
    "eventDetail": PropTypes.bool.isRequired,
    "userId": PropTypes.string
};

export default injectIntl(EventBox);