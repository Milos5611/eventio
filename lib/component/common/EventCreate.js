import React, {
	Component, PropTypes
} from "react";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import TimePicker from "material-ui/TimePicker"
import {style} from "../../common/constant";

import Dialog from "material-ui/Dialog";

class EventCreate extends Component {
	constructor(props) {
		super(props);
		this.onTitleChanged = ::this.onTitleChanged;
		this.onDescriptionChanged = ::this.onDescriptionChanged;
		this.onDateChanged = ::this.onDateChanged;
		this.onTimeChanged = ::this.onTimeChanged;
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
	
	onDateChanged(event, date) {
		let {dateChanged} = this.props;
		dateChanged(date);
	}
	
	onTimeChanged(event, time) {
		let {timeChanged} = this.props;
		timeChanged(time);
	};
	
	onCapacityChanged(event) {
		let {capacityChanged} = this.props;
		let number = event.target.value;
		let type = event.target.type;
		number = type === "number" ? number.replace(/(?!-)[^0-9.,]/g, "") : number;
		capacityChanged(number);
	}
	
	render() {
		const {title, description, date, time, capacity, ...props} = this.props;
		return (
			<Dialog
				{...props}
				autoScrollBodyContent
				className="event-create--popup"
				actionsContainerStyle={style.eventCreate.actionContainer}
				contentStyle={ style.eventCreate.dialogContent }
				bodyStyle={ style.eventCreate.dialogBody }
				style={ style.eventCreate.dialogRoot }
				modal={true}
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
				<DatePicker
					autoOk
					value={date}
					hintText="Date"
					onChange={(x, date) => this.onDateChanged(x, date)}
					textFieldStyle={style.eventCreate.datePicker}/>
				<TimePicker
					autoOk
					format="24hr"
					hintText="Time"
					value={time}
					onChange={(x, time) => this.onTimeChanged(x, time)}
					textFieldStyle={style.eventCreate.datePicker}
				/>
				<TextField
					type="number"
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
	"timeChanged": PropTypes.func,
	"capacityChanged": PropTypes.func,
	"title": PropTypes.string.isRequired,
	"description": PropTypes.string.isRequired,
	"date": PropTypes.object.isRequired,
	"time": PropTypes.object.isRequired,
	"capacity": PropTypes.number.isRequired
};

export default EventCreate;