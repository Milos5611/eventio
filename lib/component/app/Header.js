import React, {Component, PropTypes} from "react";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import {injectIntl} from "react-intl";
import {injectProps} from "relpers";
import Link from "react-router/lib/Link";
import Avatar from 'material-ui/Avatar';

class Header extends Component {
	
	constructor(props) {
		super(props);
	}
	
	get fullName() {
		return this.props.firstName + " " + this.props.lastName;
	}
	
	@injectProps
	render({isLoggedIn, firstName, lastName, userId}) {
		let content = null;
		let style = {
			top: 0,
			zIndex: 9,
			paddingTop: 24,
			fontSize: 14,
			fontWeight: 500,
			lineHeight: 1.71,
			color: "#949ea8"
		};
		
		if (isLoggedIn) {
			content = (
				<ToolbarGroup style={{marginRight: 24}} lastChild>
					<Avatar
						size={40}
						style={{color: "#949ea8", backgroundColor: "#d9dce1", marginRight: 10}}>
						{firstName.substr(0, 1) + lastName.substr(0, 1)}
					</Avatar>
					<Link>{this.fullName}</Link>
				</ToolbarGroup>
			);
		} else {
			content = (
				<ToolbarGroup style={{marginRight: 24}} lastChild>
					<p className="signUp">Don’t have account? <Link>SIGN UP</Link></p>
				</ToolbarGroup>
			);
		}
		
		return (
			<Toolbar style={style} className="header">
				<ToolbarGroup firstChild style={{marginLeft: 0}}>
					<img src={isLoggedIn ? "/images/logo_black.png" : "/images/logo.png"}
					     className="navigation-logo-img"/>
				</ToolbarGroup>
				{content}
			</Toolbar>
		);
	}
}

Header.propTypes = {
	"isLoggedIn": PropTypes.bool.isRequired,
	"firstName": PropTypes.string,
	"lastName": PropTypes.string,
	"userId": PropTypes.string
};

export default injectIntl(Header);