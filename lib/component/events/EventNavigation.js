import React, {PureComponent, PropTypes} from "react";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";

class EventNavigation extends PureComponent {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		const {getAllEvents, getFeatureEvents, getPastEvents} = this.props;
		const style = {
			backgroundColor: "#f3f3f3"
		};
		return (
			<Toolbar className="toolbar" style={style}>
				<ToolbarGroup firstChild>
					<p className="all--events" onClick={() => getAllEvents()}>all events</p>
					<p className="feature--events" onClick={() => getFeatureEvents()}>feature events</p>
					<p className="past--events" onClick={() => getPastEvents()}>past events</p>
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

EventNavigation.propTypes = {
	"getAllEvents": PropTypes.func,
	"getFeatureEvents": PropTypes.func,
	"getPastEvents": PropTypes.func
};

export default EventNavigation;