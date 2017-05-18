import { injectIntl } from "react-intl";
import React, { Component, PropTypes } from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { injectProps } from "relpers";
import LeftContainer from "../common/LeftContainer";
import history from "../../common/history";
import Snackbar from 'material-ui/Snackbar';
import { Link } from "react-router";
import { style } from "../../common/constant";

class SignUp extends Component {

    constructor( props ) {
        super(props);
        this.onShowHide = ::this.onShowHide;
        this.onFirstNameChanged = ::this.onFirstNameChanged;
        this.onLastNameChanged = ::this.onLastNameChanged;
        this.onPasswordChange = ::this.onPasswordChange;
        this.onEmailChanged = ::this.onEmailChanged;
        this.handleCheckForKeyEventSignUp = ::this.handleCheckForKeyEventSignUp;
        this.goToLogin = ::this.goToLogin;
        this.onPasswordRepeatChanged = ::this.onPasswordRepeatChanged;
        this.handleCloseSnack = ::this.handleCloseSnack;
    }

    onShowHide() {
        let { showPassword, showHide } = this.props;
        showHide(showPassword);
    }

    onFirstNameChanged( event ) {
        let { firstNameChanged } = this.props;
        firstNameChanged(event.target.value);
    }

    onLastNameChanged( event ) {
        let { lastNameChanged } = this.props;
        lastNameChanged(event.target.value);
    }

    onEmailChanged( event ) {
        let { emailChanged } = this.props;
        emailChanged(event.target.value);
    }

    onPasswordChange( event ) {
        let { passwordChanged } = this.props;
        passwordChanged(event.target.value);
    }

    onPasswordRepeatChanged( event ) {
        let { passwordRepeatChanged } = this.props;
        passwordRepeatChanged(event.target.value);
    }

    handleCheckForKeyEventSignUp( event ) {
        const { doLogin } = this.props;
        if ( event.key && event.key.toUpperCase() === "ENTER" ) {
            doLogin();
        }
    }

    goToLogin() {
        history.push("/login");
    }

    handleCloseSnack() {
        const { closeSnackBar } = this.props;
        closeSnackBar()
    }

    @injectProps
    render( { firstName, lastName, password, email, doSignUp, signUpFail, signUpOk, repeatPassword, infoMessage, showMessage } ) {
        let signUpDetail = "Enter your details below.";
        let content = !signUpOk ? (
            <div className="evnt-login">
                <Row className="form-sign-in">
                    <LeftContainer/>

                    <Col lg={9} md={8} sm={12}>
                        <div className={signUpFail ? "error login-form" : "login-form"}>
                            <aside>
                                <h3 className="aside-title">Get Started Absolutely free</h3>
                                <p className={signUpFail ? "login--fail aside-desc" : "login--good aside-desc"}>{signUpDetail}</p>
                            </aside>
                            <TextField
                                type="text"
                                floatingLabelText="First Name"
                                value={firstName}
                                onChange={this.onFirstNameChanged}
                                fullWidth={true}
                                onKeyPress={this.handleCheckForKeyEventSignUp}
                            />
                            <TextField
                                type="text"
                                floatingLabelText="Last Name"
                                value={lastName}
                                onChange={this.onLastNameChanged}
                                fullWidth={true}
                                onKeyPress={this.handleCheckForKeyEventSignUp}
                            />
                            <TextField
                                type="email"
                                floatingLabelText="Email"
                                value={email}
                                onChange={this.onEmailChanged}
                                fullWidth={true}
                                onKeyPress={this.handleCheckForKeyEventSignUp}
                            />
                            <TextField
                                type="password"
                                floatingLabelText="Password"
                                value={password}
                                onChange={this.onPasswordChange}
                                fullWidth={true}
                                onKeyPress={this.handleCheckForKeyEventSignUp}
                            />
                            <TextField
                                type="password"
                                floatingLabelText="Repeat password"
                                value={repeatPassword}
                                onChange={this.onPasswordRepeatChanged}
                                fullWidth={true}
                                onKeyPress={this.handleCheckForKeyEventSignUp}
                            />

                            {
                                location.pathname === "/signUp" ?
                                    <p className="signUp--bootom">Already have account? <Link to={"/login"}>SIGN
                                        IN</Link>
                                    </p>
                                    :
                                    <p className="signUp--bootom">Don’t have account? <Link to={"/signUp"}>SIGN
                                        UP</Link>
                                    </p>
                            }

                            <RaisedButton buttonStyle={style.signUp} className="btn-success"
                                          onClick={doSignUp} label="Sign Up" primary={true}/>
                        </div>
                    </Col>
                </Row>
                <Snackbar
                    open={showMessage}
                    message={infoMessage}
                    autoHideDuration={3000}
                    onRequestClose={this.handleCloseSnack}
                />
            </div >
        ) : (
            <div className="evnt-login">
                <Row className="form-sign-in">
                    <LeftContainer/>

                    <Col lg={9} md={8} sm={12}>
                        <div className={signUpFail ? "error login-form" : "login-form"}>
                            <div className="sign-up__ok">
                                <h1>Great Work, you have successfully signed up to Eventio</h1>
                                <h3>Click here to go on login page</h3>
                                <RaisedButton buttonStyle={style.signUp} className="btn-success"
                                              onClick={this.goToLogin} label="Log In" primary={true}/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
        return (
            <div>{content}</div>
        );
    }
}

SignUp.propTypes = {
    "children": PropTypes.element,
    "firstName": PropTypes.string.isRequired,
    "email": PropTypes.string.isRequired,
    "lastName": PropTypes.string.isRequired,
    "password": PropTypes.string.isRequired,
    "repeatPassword": PropTypes.string,
    "doSignUp": PropTypes.func.isRequired,
    "firstNameChanged": PropTypes.func.isRequired,
    "lastNameChanged": PropTypes.func.isRequired,
    "emailChanged": PropTypes.func.isRequired,
    "passwordChanged": PropTypes.func.isRequired,
    "passwordRepeatChanged": PropTypes.func.isRequired,
    "signUpFail": PropTypes.bool.isRequired,
    "signUpOk": PropTypes.bool.isRequired,
    "infoMessage": PropTypes.string,
    "showMessage": PropTypes.bool,
    "closeSnackBar": PropTypes.func
};

export default injectIntl(SignUp);
