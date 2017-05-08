import {injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.onShowHide = ::this.onShowHide;
		this.onUsernameChanged = ::this.onUsernameChanged;
		this.onPasswordChanged = ::this.onPasswordChanged;
		this.handleCheckForKeyEventLogin = ::this.handleCheckForKeyEventLogin;
	}
	
	onShowHide(event) {
		let {showPassword, showHide} = this.props;
		event.preventDefault();
		event.stopPropagation();
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
	
	render() {
		const {username, password, doLogin, showPassword, loginFail, children, isLoggedIn} = this.props;
		let loginDetail = loginFail ? "Oops. That email and password combination is not valid." : "Enter your details below.",
			inputStileClass = "input__label input__label--hoshi input__label--hoshi-color-1",
			content = !isLoggedIn ?
				(
					<div className="evnt-login">
						<Row className="form-sign-in">
							<Col lg={3} md={4}>
								<div className="image-holder">
									<aside>
										<h2 className="quote">"Great, kid. Don't get cocky"</h2>
										<hr/>
										<h4 className="author">Han Solo</h4>
									</aside>
								</div>
							</Col>
							<Col lg={9} md={8} sm={12}>
								<div className="login-form">
									<aside>
										<h3 className="aside-title">Sign in to Eventio.</h3>
										<p className={loginFail ? "login--fail aside-desc" : "login--good aside-desc"}>{loginDetail}</p>
									</aside>
									<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
										<FormControl value={username}
										             onChange={this.onUsernameChanged}
										             type="text" className="input__field input__field--hoshi"
										             placeholder="Please enter your username"/>
										<label
											className={loginFail ? inputStileClass + " fail--login" : inputStileClass}>
											<span
												className="input__label-content input__label-content--hoshi">Username</span>
										</label>
									</FormGroup>
									<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
										<FormControl value={password} type={showPassword ? "text" : "password"}
										             onChange={this.onPasswordChanged}
										             className="input__field input__field--hoshi"
										             placeholder="Please enter your password"/>
										<label
											className={loginFail ? inputStileClass + " fail--login" : inputStileClass}>
											<span
												className="input__label-content input__label-content--hoshi">Password</span>
										</label>
										<span className="glyphicon glyphicon-eye-open show-password"
										      onClick={this.onShowHide}/>
									
									</FormGroup>
									<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
										<Button bsStyle="success" bsSize="large" onClick={doLogin}>Sign In</Button>
									</FormGroup>
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
	"password": PropTypes.string,
	"isLoggedIn": PropTypes.bool.isRequired,
	"doLogin": PropTypes.func.isRequired,
	"usernameChanged": PropTypes.func.isRequired,
	"passwordChanged": PropTypes.func.isRequired,
	"showPassword": PropTypes.bool,
	"showHide": PropTypes.func,
	"loginFail": PropTypes.bool
};

export default injectIntl(Login);
