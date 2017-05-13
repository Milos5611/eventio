import React, {PureComponent} from "react";
import {Col} from "react-bootstrap";


class LeftContainer extends PureComponent {
	render() {
		return (
			<Col lg={3} md={4}>
				<div className="image-holder">
					<aside>
						<h2 className="quote">"Great, kid. Don"t get cocky"</h2>
						<hr/>
						<h4 className="author">Han Solo</h4>
					</aside>
				</div>
			</Col>
		);
	}
}

export default LeftContainer;