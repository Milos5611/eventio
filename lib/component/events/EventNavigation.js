import React, {PureComponent, PropTypes} from "react";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";

class EventNavigation extends PureComponent {
	
	constructor(props) {
		super(props);
		this.showGridView = ::this.showGridView;
		this.showListView = ::this.showListView;
	}
	
	showGridView() {
		this.props.showGridView();
	}
	
	showListView() {
		this.props.showListView();
	}
	
	render() {
		const {getAllEvents, getFeatureEvents, getPastEvents, grid, list, activeEvents} = this.props;
		const style = {
			backgroundColor: "#f3f3f3"
		};
		return (
			<Toolbar className="toolbar" style={style}>
				<ToolbarGroup className="link" firstChild>
					<p className={activeEvents.allEvents ? "active all--events" : "all--events"}
					   onClick={() => getAllEvents()}>all events</p>
					<p className={activeEvents.featureEvents ? "active feature--events" : "feature--events"}
					   onClick={() => getFeatureEvents()}>feature events</p>
					<p className={activeEvents.pastEvents ? "active past--events" : "past--events"}
					   onClick={() => getPastEvents()}>past events</p>
				</ToolbarGroup>
				<ToolbarGroup style={{marginBottom: 15, marginRight: 0}} className="grid" lastChild>
					<a onClick={this.showGridView} className={grid ? "active grid--view" : "grid--view"}/>
					<a onClick={this.showListView} className={list ? "active list--view" : "list--view"}/>
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

EventNavigation.propTypes = {
	"getAllEvents": PropTypes.func,
	"getFeatureEvents": PropTypes.func,
	"getPastEvents": PropTypes.func,
	"showGridView": PropTypes.func,
	"showListView": PropTypes.func,
	"grid": PropTypes.bool,
	"list": PropTypes.bool,
	"activeEvents": PropTypes.object
};

export default EventNavigation;