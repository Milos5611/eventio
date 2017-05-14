import React, {
	Component, PropTypes
} from "react";
import DatePicker from 'material-ui/DatePicker';
import TextField from "material-ui/TextField";

import Dialog from "material-ui/Dialog";

const styles = {
	dialogRoot: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 0
	},
	dialogContent: {
		position: "relative",
		width: "100vw",
		transform: "",
	},
	dialogBody: {
		paddingBottom: 0
	}
};

class EventCreate extends Component {
	constructor(props) {
		super(props);
		this.onTitleChanged = ::this.onTitleChanged;
		this.onDescriptionChanged = ::this.onDescriptionChanged;
		this.onDateChanged = ::this.onDateChanged;
		this.onCapacityChanged = ::this.onCapacityChanged;
	}
	
	onTitleChanged(event) {
		let {titleChanged} = this.props;
		titleChanged(event.target.value);
	}
	
	onDescriptionChanged(event) {
		let {descriptionChanged} = this.props;
		descriptionChanged(event.target.value);
	}
	
	onDateChanged(x, date) {
		let {dateChanged} = this.props;
		dateChanged(date);
	}
	
	onCapacityChanged(event) {
		let {capacityChanged} = this.props;
		capacityChanged(event.target.value);
	}
	
	render() {
		const {title, description, date, capacity, ...props} = this.props;
		return (
			<Dialog
				{...props}
				className="event-create--popup"
				contentStyle={ styles.dialogContent }
				bodyStyle={ styles.dialogBody }
				style={ styles.dialogRoot }
				repositionOnUpdate={ false }>
				
				<div className="event-create--info">
					<h3>Create new event</h3>
					<p>Enter detail below</p>
				</div>
				
				<TextField
					type="text"
					floatingLabelText="Title"
					value={title}
					onChange={this.onTitleChanged}
					fullWidth={true}
				/>
				<TextField
					type="text"
					floatingLabelText="Description"
					value={description}
					onChange={this.onDescriptionChanged}
					fullWidth={true}
				/>
				<DatePicker value={date} hintText="Date" onChange={(x, date) => this.onDateChanged(x, date)}/>
				<TextField
					type="text"
					floatingLabelText="Capacity"
					value={capacity}
					onChange={this.onCapacityChanged}
					fullWidth={true}
				/>
			</Dialog>
		);
	}
}

EventCreate.PropTypes = {
	"titleChanged": PropTypes.func,
	"descriptionChanged": PropTypes.func,
	"dateChanged": PropTypes.func,
	"capacityChanged": PropTypes.func,
	"title": PropTypes.string.isRequired,
	"description": PropTypes.string.isRequired,
	"date": PropTypes.object.isRequired,
	"capacity": PropTypes.number.isRequired,
	
};

export default EventCreate;