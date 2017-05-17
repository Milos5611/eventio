import React, {PureComponent, PropTypes} from "react";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import {injectProps} from "relpers";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class EventNavigation extends PureComponent {
	
	constructor(props) {
		super(props);
		this.showGridView = ::this.showGridView;
		this.showListView = ::this.showListView;
		this.handleChange = ::this.handleChange;
		// I am running out of time that's why
		this.state = {value: 1};
	}
	
	handleChange(event, index, value) {
		this.setState({value});
	}
	
	showGridView() {
		const {showGridView} = this.props;
		showGridView();
	}
	
	showListView() {
		const {showListView} = this.props;
		showListView();
	}
	
	@injectProps
	render({getAllEvents, getFeatureEvents, getPastEvents, grid, list, activeEvents, userProfile}) {
		return (
			<Toolbar className="toolbar" style={{backgroundColor: "#f3f3f3"}}>
				{userProfile === "" ?
					<div className="toolbar-wrapper">
						<ToolbarGroup className="link" firstChild>
							<p className={activeEvents.allEvents ? "active all--events" : "all--events"}
							   onClick={() => getAllEvents()}>all events</p>
							<p className={activeEvents.featureEvents ? "active feature--events" : "feature--events"}
							   onClick={() => getFeatureEvents()}>feature events</p>
							<p className={activeEvents.pastEvents ? "active past--events" : "past--events"}
							   onClick={() => getPastEvents()}>past events</p>
						</ToolbarGroup>
						<ToolbarGroup className="link-mobile">
							<p className="link-text">SHOW:</p>
							<DropDownMenu value={this.state.value} onChange={this.handleChange}>
								<MenuItem value={1} primaryText="ALL EVENTS" onClick={() => getAllEvents()}/>
								<MenuItem value={2} primaryText="FEATURE EVENTS" onClick={() => getFeatureEvents()}/>
								<MenuItem value={3} primaryText="PAST EVENTS" onClick={() => getPastEvents()}/>
							</DropDownMenu>
						</ToolbarGroup>
					</div> :
					<div className="user-profile--title">
						<h1>{userProfile}</h1>
					</div> }
				<ToolbarGroup style={{marginBottom: "15px", marginRight: "0"}} className="grid" lastChild>
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
	"activeEvents": PropTypes.object,
	"userProfile": PropTypes.string.isRequired
};

export default EventNavigation;