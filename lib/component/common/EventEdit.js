import React, {PureComponent, PropTypes} from "react";
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
		const {data} = this.props;
		let time = moment(data.startAt).format("HH:MM");
		let date = moment(data.startAt).format("YYYY-MM-DD");
		return (
			<div className={"card- event-edit"}>
				<div className="wrapper">
					<div className="card radius shadowDepth1">
						<div className="card__content card__padding">
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
							<DatePicker
								autoOk
								value={{date}}
								hintText="Date"
								onChange={(x, date) => this.onDateChanged(x, date)}
								textFieldStyle={style.eventCreate.datePicker}/>
							<TimePicker
								autoOk
								format="24hr"
								hintText="Time"
								value={{time}}
								onChange={(x, time) => this.onTimeChanged(x, time)}
								textFieldStyle={style.eventCreate.datePicker}
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
			</div>);
	}
}

EventEdit.propTypes = {
	"data": PropTypes.object.isRequired,
	"titleChanged": PropTypes.func,
	"descriptionChanged": PropTypes.func,
	"dateChanged": PropTypes.func,
	"timeChanged": PropTypes.func,
	"capacityChanged": PropTypes.func
};

export default EventEdit;
