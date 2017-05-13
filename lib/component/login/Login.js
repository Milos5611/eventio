import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {injectProps} from "relpers";
import LeftContainer from "../common/LeftContainer";

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.onShowHide = ::this.onShowHide;
		this.onUsernameChanged = ::this.onUsernameChanged;
		this.onPasswordChanged = ::this.onPasswordChanged;
		this.handleCheckForKeyEventLogin = ::this.handleCheckForKeyEventLogin;
	}
	
	onShowHide() {
		let {showPassword, showHide} = this.props;
		showHide(showPassword);
	}
	
	onUsernameChanged(event) {
		let {usernameChanged} = this.props;
		usernameChanged(event.target.value);
	}
	
	onPasswordChanged(event) {
		let {passwordChanged} = this.props;
		passwordChanged(event.target.value);
	}
	
	handleCheckForKeyEventLogin(event) {
		const {doLogin} = this.props;
		if (event.key && event.key.toUpperCase() === "ENTER") {
			doLogin();
		}
	}
	
	@injectProps
	render({username, password, doLogin, showPassword, loginFail, children, isLoggedIn}) {
		const style = {
			backgroundColor: "#22d486",
			width: 240,
			height: 57,
			lineHeight: 4,
			marginTtop: 20
		};
		let loginDetail = loginFail ? "Oops. That email and password combination is not valid." : "Enter your details below.";
		let content = !isLoggedIn ?
			(
				<div className="evnt-login">
					<Row className="form-sign-in">
						<LeftContainer/>
						<Col lg={9} md={8} sm={12}>
							<div className={loginFail ? "error login-form" : "login-form"}>
								<aside>
									<h3 className="aside-title">Sign in to Eventio.</h3>
									<p className={loginFail ? "login--fail aside-desc" : "login--good aside-desc"}>{loginDetail}</p>
								</aside>
								<TextField
									type="text"
									floatingLabelText="Username"
									value={username}
									onChange={this.onUsernameChanged}
									fullWidth={true}
									onKeyPress={this.handleCheckForKeyEventLogin}
								/>
								<div className="password--wrapper">
									<TextField
										type={showPassword ? "text" : "password"}
										floatingLabelText="Password"
										value={password}
										onChange={this.onPasswordChanged}
										fullWidth={true}
										onKeyPress={this.handleCheckForKeyEventLogin}
									/>
									<span className="glyphicon glyphicon-eye-open show-password"
									      onClick={this.onShowHide}/>
								</div>
								
								<RaisedButton buttonStyle={style} className="btn-success"
								              onClick={doLogin} label="Sign In" primary={true}/>
							</div>
						</Col>
					</Row>
				</div >
			) : children;
		return (
			<div>{content}</div>
		);
	}
}

Login.propTypes = {
	"children": PropTypes.element,
	"username": PropTypes.string.isRequired,
	"password": PropTypes.string.isRequired,
	"isLoggedIn": PropTypes.bool.isRequired,
	"doLogin": PropTypes.func.isRequired,
	"usernameChanged": PropTypes.func.isRequired,
	"passwordChanged": PropTypes.func.isRequired,
	"showPassword": PropTypes.bool,
	"showHide": PropTypes.func,
	"loginFail": PropTypes.bool
};

export default injectIntl(Login);
