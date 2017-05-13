import React, {PureComponent, PropTypes} from "react";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";

class EventNavigation extends PureComponent {
	
	constructor(props) {
		super(props);
	}
	
	getFeatureEvents() {
	
	}
	
	render() {
		const {getAllEvents} = this.props;
		const style = {
			backgroundColor: "#f3f3f3"
		};
		return (
			<Toolbar className="toolbar" style={style}>
				<ToolbarGroup firstChild>
					<p className="all--events" onClick={() => getAllEvents()}>all events</p>
					<p className="feature--events" onClick={() => getAllEvents()}>feature events</p>
					<p className="past--events" onClick={() => getAllEvents()}>past events</p>
				</ToolbarGroup>
			</Toolbar>
		);
	}
}

EventNavigation.propTypes = {
	"getAllEvents": PropTypes.func
};

export default EventNavigation;