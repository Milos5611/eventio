import {FormattedMessage, injectIntl} from "react-intl";
import React, {Component, PropTypes} from "react";
import Col from "react-bootstrap/lib/Col";
import IndexLink from "react-router/lib/IndexLink";
import Row from "react-bootstrap/lib/Row";


class Header extends Component {
	
	render() {
		return (
			<Row id="headerContainer" className="login-header">
				<Col lg={2} md={4} sm={4} xs={4}>
					<div className="daad-logo">E.</div>
					<div id="shortcuts">
						<IndexLink to="/userArea/templates" activeClassName="active">
							Cao
						</IndexLink>
						<IndexLink to="/userArea/respondentsOverview" activeClassName="active">
							Hey
						</IndexLink>
					</div>
				</Col>
			</Row>
		);
	}
}

Header.propTypes = {};

export default injectIntl(Header);
