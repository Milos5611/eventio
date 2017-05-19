import React, {PureComponent, PropTypes} from "react";
import {FloatingActionButton} from "material-ui";
import ActionDone from "material-ui/svg-icons/action/done";
import DatePicker from "material-ui/DatePicker";
import TextField from "material-ui/TextField";
import TimePicker from "material-ui/TimePicker";
import moment from "moment";
import {style} from "../../common/constant";

class EventEdit extends PureComponent {
	
	constructor(props) {
		super(props);
		this.onTitleChanged = ::this.onTitleChanged;
		this.onDescriptionChanged = ::this.onDescriptionChanged;
		this.onDateChanged = ::this.onDateChanged;
		this.onTimeChanged = ::this.onTimeChanged;
		this.onCapacityChanged = ::this.onCapacityChanged;
		this.onUpdateEvent = ::this.onUpdateEvent;
	}
	
	onTitleChanged(event) {
		let {titleUpdateChanged} = this.props;
		titleUpdateChanged(event.target.value);
	}
	
	onDescriptionChanged(event) {
		let {descriptionUpdateChanged} = this.props;
		descriptionUpdateChanged(event.target.value);
	}
	
	onDateChanged(event, date) {
		let {dateUpdateChanged} = this.props;
		dateUpdateChanged(date);
	}
	
	onTimeChanged(event, time) {
		let {timeUpdateChanged} = this.props;
		timeUpdateChanged(time);
	};
	
	onCapacityChanged(event) {
		let {capacityUpdateChanged} = this.props;
		let number = event.target.value;
		let type = event.target.type;
		number = type === "number" ? number.replace(/(?!-)[^0-9.,]/g, "") : number;
		capacityUpdateChanged(number);
	}
	
	onUpdateEvent(id) {
		const {updateEvent} = this.props;
		updateEvent(id);
	}
	
	render() {
		const {data} = this.props;
		return (
			<div className={"card- event-edit"}>
				<div className="wrapper">
					<div className="card radius shadowDepth1">
						<div className="card__content card__padding">
							<DatePicker
								autoOk
								hintText="Date"
								onChange={(x, date) => this.onDateChanged(x, date)}
								textFieldStyle={style.eventCreate.datePicker}/>
							<TimePicker
								autoOk
								format="24hr"
								hintText="Time"
								onChange={(x, time) => this.onTimeChanged(x, time)}
								textFieldStyle={style.eventCreate.datePicker}
							/>
							<TextField
								type="text"
								floatingLabelText="Title"
								value={data.title}
								onChange={this.onTitleChanged}
								fullWidth={true}
							/>
							<TextField
								type="text"
								floatingLabelText="Description"
								value={data.description}
								onChange={this.onDescriptionChanged}
								fullWidth={true}
							/>
							<TextField
								type="number"
								floatingLabelText="Capacity"
								value={data.capacity}
								onChange={this.onCapacityChanged}
								fullWidth={true}
							/>
						</div>
					</div>
				</div>
				<FloatingActionButton onTouchTap={() => this.onUpdateEvent(data.id)} className="edit-events--button">
					<ActionDone  />
				</FloatingActionButton>
			</div>);
	}
}

// TODO: populate default value

EventEdit.propTypes = {
	"data": PropTypes.object.isRequired,
	"titleUpdateChanged": PropTypes.func,
	"descriptionUpdateChanged": PropTypes.func,
	"dateUpdateChanged": PropTypes.func,
	"timeUpdateChanged": PropTypes.func,
	"capacityUpdateChanged": PropTypes.func,
	"updateEvent": PropTypes.func
};

export default EventEdit;
