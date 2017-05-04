import { FormattedMessage, injectIntl, intlShape } from "react-intl";
import React, { Component, PropTypes } from "react";
import Button from "react-bootstrap/lib/Button";
import FormControl from "react-bootstrap/lib/FormControl";
import FormGroup from "react-bootstrap/lib/FormGroup";
import Row from "react-bootstrap/lib/Row";

class Login extends Component {

    constructor( props ) {
        super(props);
        this.onUsernameChanged = ::this.onUsernameChanged;
        this.onPasswordChanged = ::this.onPasswordChanged;
        this.handleCheckForKeyEventLogin = ::this.handleCheckForKeyEventLogin;
    }

    // Check for JWT token and send it for authentication
    componentDidMount() {
        const { doLogin } = this.props;
    }

    onUsernameChanged( event ) {
        this.props.usernameChanged(event.target.value);
    }

    onPasswordChanged( event ) {
        this.props.passwordChanged(event.target.value);
    }

    handleCheckForKeyEventLogin( event ) {
        if ( event.key && event.key.toUpperCase() === "ENTER" ) {
            const { doLogin } = this.props;
            doLogin();
        }
    }

    render() {
        const { children, isLoggedIn, username, password, doLogin, intl } = this.props,
            content = !isLoggedIn ?
                (<div className="daad-login">
                    <Logo role={this.props.role} />

                    <Row className="form-signin">
                        <FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
                            <FormControl value={username}
                                         onChange={this.onUsernameChanged}
                                         autoComplete="off"
                                         placeholder={intl.formatMessage({ "id": "login.placeholder.username" })}
                            />
                        </FormGroup>
                        <FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
                            <FormControl value={password}
                                         type="password"
                                         onChange={this.onPasswordChanged}
                                         autoComplete="off"
                                         placeholder={intl.formatMessage({ "id": "login.placeholder.password" })}
                            />
                        </FormGroup>
                        <FormGroup onKeyPress={this.handleCheckForKeyEventLogin}>
                            <Button
                                className="daad-button-primary"
                                onClick={ doLogin}
                                bsStyle="primary"
                                block
                            >
                                <FormattedMessage id="login.loginButton" />
                            </Button>
                        </FormGroup>
                    </Row>

                    <Row className="login-error">
                        <MessagesContainer />
                    </Row>
                </div>)
                : children;
        return (
            <div>{content}</div>
        );
    }

}

Login.propTypes = {
    "children": PropTypes.element,
    "isLoggedIn": PropTypes.bool.isRequired,
    "username": PropTypes.string.isRequired,
    "password": PropTypes.string.isRequired,
    "doLogin": PropTypes.func.isRequired,
    "usernameChanged": PropTypes.func.isRequired,
    "passwordChanged": PropTypes.func.isRequired,
    "intl": intlShape.isRequired,
    "location": PropTypes.object.isRequired,
    "role": PropTypes.array
};

export default injectIntl(Login);
