import React, {PureComponent, PropTypes} from "react";
import {injectIntl} from "react-intl";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import {injectProps} from "relpers";
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {style} from "../../common/constant";

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
	render({getAllEvents, getFeatureEvents, getPastEvents, grid, list, activeEvents, userProfile, intl}) {
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
								<MenuItem value={1} primaryText={intl.formatMessage({"id": "event.navigation.all"})}
								          onClick={() => getAllEvents()}/>
								<MenuItem value={2} primaryText={intl.formatMessage({"id": "event.navigation.feature"})}
								          onClick={() => getFeatureEvents()}/>
								<MenuItem value={3} primaryText={intl.formatMessage({"id": "event.navigation.past"})}
								          onClick={() => getPastEvents()}/>
							</DropDownMenu>
						</ToolbarGroup>
					</div> :
					<div className="user-profile--title">
						<h1>{userProfile}</h1>
					</div> }
				<ToolbarGroup style={style.eventNavigation} className="grid" lastChild>
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
	"userProfile": PropTypes.string.isRequired,
	"intl": PropTypes.object
};

export default injectIntl(EventNavigation);