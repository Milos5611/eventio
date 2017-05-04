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
		this.onUsernameChanged = ::this.onUsernameChanged;
		this.onPasswordChanged = ::this.onPasswordChanged;
		this.handleCheckForKeyEventLogin = ::this.handleCheckForKeyEventLogin;
	}
	
	onUsernameChanged(event) {
		this.props.usernameChanged(event.target.value);
	}
	
	onPasswordChanged(event) {
		this.props.passwordChanged(event.target.value);
	}
	
	handleCheckForKeyEventLogin(event) {
		if (event.key && event.key.toUpperCase() === "ENTER") {
			const {doLogin} = this.props;
			doLogin();
		}
	}
	
	render() {
		const {username, password, doLogin} = this.props;
		return (
			<div className="evnt-login">
				<Row className="form-signin">
					<Col lg={3} md={4}>
						<div className="image-holder">
							<span>"Great, kid. Don't get cocky"</span>
						</div>
					</Col>
					<Col lg={9} md={8} sm={12}>
						<div className="login-form">
							<FormGroup onKeyPress={this.handleCheckForKeyEventLogin} className="input input--hoshi">
								<FormControl value={username} onChange={this.onUsernameChanged} type="text"
								             autoComplete={false} className="input__field input__field--hoshi"/>
								<label className="input__label input__label--hoshi input__label--hoshi-color-1">
									<span className="input__label-content input__label-content--hoshi">Username</span>
								</label>
							</FormGroup>
							<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
								<FormControl value={password} type="password" onChange={this.onPasswordChanged}
								             autoComplete={false} className="input__field input__field--hoshi"/>
								<label className="input__label input__label--hoshi input__label--hoshi-color-2">
									<span className="input__label-content input__label-content--hoshi">Password</span>
								</label>
							</FormGroup>
							<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
								<Button
									className="evnt-button-primary"
									onClick={doLogin}
									bsStyle="primary"
									block>Sign In</Button>
							</FormGroup>
						</div>
					</Col>
				</Row>
			</div >
		);
	}
	
}

Login.propTypes = {
	"username": PropTypes.string.isRequired,
	"password": PropTypes.string.isRequired,
	"doLogin": PropTypes.func.isRequired,
	"usernameChanged": PropTypes.func.isRequired,
	"passwordChanged": PropTypes.func.isRequired
};

export default injectIntl(Login);
