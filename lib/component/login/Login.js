import {FormattedMessage, injectIntl, intlShape} from "react-intl";
import React, {Component, PropTypes} from "react";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Row from "react-bootstrap/lib/Row";

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.onUsernameChanged = ::this.onUsernameChanged;
		this.onPasswordChanged = ::this.onPasswordChanged;
		this.handleCheckForKeyEventLogin = ::this.handleCheckForKeyEventLogin;
	}
	
	// Check for JWT token and send it for authentication
	componentDidMount() {
		const {doLogin} = this.props;
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
					<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
						<FormControl value={username}
						             onChange={this.onUsernameChanged}
						             autoComplete="off"
						/>
					</FormGroup>
					<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
						<FormControl value={password}
						             type="password"
						             onChange={this.onPasswordChanged}
						             autoComplete="off"
						/>
					</FormGroup>
					<FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
						<Button
							className="evnt-button-primary"
							onClick={doLogin}
							bsStyle="primary"
							block>
							<FormattedMessage id="login.loginButton"/>
						</Button>
					</FormGroup>
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
	"passwordChanged": PropTypes.func.isRequired,
	"intl": intlShape.isRequired
};

export default injectIntl(Login);
