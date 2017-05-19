import React, {Component, PropTypes} from "react";
import {injectIntl} from "react-intl";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import {style} from "../../common/constant";
import {withRouter} from 'react-router'
import {injectProps} from "relpers";
import Link from "react-router/lib/Link";
import Avatar from 'material-ui/Avatar';

class Header extends Component {
	
	constructor(props) {
		super(props);
	}
	
	get fullName() {
		return this.props.firstName + " " + this.props.lastName
	}
	
	get initials() {
		return <Link to={"/profile"}>{this.props.firstName.substr(0, 1) + this.props.lastName.substr(0, 1)}</Link>
	}
	
	@injectProps
	render({isLoggedIn, location, router, intl}) {
		let content = null;
		
		if (isLoggedIn) {
			content = (
				<ToolbarGroup style={style.toolbarGroup} lastChild>
					<Avatar
						size={40}
						className="navigation-avatar"
						style={style.headerAvatar}>
						{this.initials}
					</Avatar>
					<Link className="header-name" to={"/profile"}>{this.fullName}</Link>
				</ToolbarGroup>
			);
		} else {
			content = (
				<ToolbarGroup style={style.toolbarGroup} lastChild>
					{
						location.pathname === "/signUp" ?
							<p className="signUp">{intl.formatMessage({"id": "login.signin_message"})}
								<Link to={"/login"}>{intl.formatMessage({"id": "login.signin"})}</Link>
							</p>
							:
							<p className="signUp">{intl.formatMessage({"id": "login.signup_message"})}
								<Link to={"/signUp"}>{intl.formatMessage({"id": "login.signup"})}</Link>
							</p>
					}
				</ToolbarGroup>
			);
		}
		
		return (
			<Toolbar style={style.toolbar} className="header">
				<ToolbarGroup firstChild style={{marginLeft: 0}}>
					<Link to={"/"}/>
					<span className={(isLoggedIn ? "black-logo" : "white-logo") + " navigation-logo-img"}/>
				</ToolbarGroup>
				<ToolbarGroup>
					{location.pathname === "detail" ?
						<Link onClick={() => router.goBack()}
						      className="arrow-left">{intl.formatMessage({"id": "header.back.button"})}</Link> : null}
				</ToolbarGroup>
				{content}
			</Toolbar>
		);
	}
}

Header.contextTypes = {
	"location": PropTypes.object,
	"router": PropTypes.object.isRequired
};

Header.propTypes = {
	"isLoggedIn": PropTypes.bool.isRequired,
	"firstName": PropTypes.string,
	"lastName": PropTypes.string,
	"userId": PropTypes.string,
	"intl": PropTypes.object
};

export default injectIntl(withRouter(Header));