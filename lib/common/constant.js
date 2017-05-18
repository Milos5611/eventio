export const TYPE_KEY = "type";
export const tomorrow = new Date((new Date()).getTime() + 86400000);
export const style = {
	toolbar: {
		top: 0,
		zIndex: 1,
		paddingTop: 24,
		fontSize: 14,
		fontWeight: 500,
		lineHeight: 1.71,
		color: "#949ea8"
	},
	toolbarGroup: {
		marginRight: 0
	},
	headerAvatar: {
		color: "#949ea8",
		backgroundColor: "#d9dce1"
	},
	eventCreate: {
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
		},
		datePicker: {
			width: "100%",
			height: "65px"
		},
		actionContainer: {
			borderBottom: "none"
		}
	},
	subscriber: {
		join_group: {
			backgroundColor: "#22d486",
			width: 100,
			height: 32,
			borderRadius: 4
		},
		leave_group: {
			backgroundColor: "#ff4081",
			width: 100,
			height: 32,
			borderRadius: 4
		},
		edit_group: {
			backgroundColor: "#d9dce1",
			color: "#a9aeb4",
			width: 100,
			height: 32,
			borderRadius: 4
		},
		labelColor: {
			color: "#fff"
		}
	},
	eventDetail: {
		wrapper: {
			display: 'flex',
			flexWrap: 'wrap',
			float: "left",
			marginRight: "15px",
			marginBottom: "10px"
		},
		labelColor: {
			color: "#949ea8"
		}
	},
	eventNavigation: {
		marginBottom: "15px",
		marginRight: "0"
	},
	events: {
		backgroundColor: "#22d486",
		width: 200,
		height: 36,
		marginTop: 30,
		textAlign: "center"
	},
	login: {
		button: {
			backgroundColor: "#22d486",
			width: 240,
			height: 57,
			lineHeight: 4,
			marginTop: 20
		},
		password_icon: {
			position: "absolute",
			right: 0,
			bottom: "20px",
			width: "auto"
		},
		icon: {
			fill: "rgba(0, 0, 0, 0.22)"
		}
	},
	signUp: {
		backgroundColor: "#22d486",
		width: 240,
		height: 57,
		lineHeight: 4,
		marginTop: 20
	},
	userProfile: {
		color: "#949ea8",
		backgroundColor: "#d9dce1",
		marginRight: 10,
		top: "-50px",
		position: "relative"
	}
};