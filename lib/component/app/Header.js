import React, { Component, PropTypes } from "react";
import { Toolbar, ToolbarGroup } from "material-ui/Toolbar";
import { withRouter } from 'react-router'
import { injectProps } from "relpers";
import Link from "react-router/lib/Link";
import Avatar from 'material-ui/Avatar';

class Header extends Component {

    constructor( props ) {
        super(props);
    }

    get fullName() {
        return this.props.firstName + " " + this.props.lastName
    }

    get initials() {
        return <Link to={"/profile"}>{this.props.firstName.substr(0, 1) + this.props.lastName.substr(0, 1)}</Link>
    }

    @injectProps
    render( { isLoggedIn, location } ) {
        let content = null;
        let style = {
            top: 0,
            zIndex: 1,
            paddingTop: 24,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.71,
            color: "#949ea8"
        };

        if ( isLoggedIn ) {
            content = (
                <ToolbarGroup style={{ marginRight: 24 }} lastChild>
                    <Avatar
                        size={40}
                        style={{ color: "#949ea8", backgroundColor: "#d9dce1", marginRight: 10 }}>
                        {this.initials}
                    </Avatar>
                    <Link to={"/profile"}>{this.fullName}</Link>
                </ToolbarGroup>
            );
        } else {
            content = (
                <ToolbarGroup style={{ marginRight: 24 }} lastChild>
                    {
                        location.pathname === "/signUp" ?
                            <p className="signUp">Already have account? <Link to={"/login"}>SIGN IN</Link></p>
                            :
                            <p className="signUp">Don’t have account? <Link to={"/signUp"}>SIGN UP</Link></p>
                    }
                </ToolbarGroup>
            );
        }

        return (
            <Toolbar style={style} className="header">
                <ToolbarGroup firstChild style={{ marginLeft: 0 }}>
                    <span className={(isLoggedIn ? "black-logo" : "white-logo") + " navigation-logo-img"}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    {location.pathname === "detail" ?
                        <Link to={"/events"} className="arrow-left">Back Button</Link> : null}
                </ToolbarGroup>
                {content}
            </Toolbar>
        );
    }
}

Header.contextTypes = {
    "location": PropTypes.object
};

Header.propTypes = {
    "isLoggedIn": PropTypes.bool.isRequired,
    "firstName": PropTypes.string,
    "lastName": PropTypes.string,
    "userId": PropTypes.string
};

export default withRouter(Header);