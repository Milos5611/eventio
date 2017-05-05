import {injectIntl} from "react-intl";
import React, {Component} from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";

class Events extends Component {
	
	render() {
		return (
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
			</Row>
		);
	}
	
}

Events.propTypes = {};

export default injectIntl(Events);
