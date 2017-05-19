import React, {PureComponent, PropTypes} from "react";
import {injectIntl} from "react-intl";
import {Col} from "react-bootstrap";


class LeftContainer extends PureComponent {
	render() {
		const {intl} = this.props;
		return (
			<Col lg={3} md={4}>
				<div className="image-holder">
					<aside>
						<h2 className="quote">{intl.formatMessage({"id": "left.container.quote"})}</h2>
						<hr/>
						<h4 className="author">{intl.formatMessage({"id": "left.container.writer"})}</h4>
					</aside>
				</div>
			</Col>
		);
	}
}

LeftContainer.propTypes = {
	"intl": PropTypes.object
};

export default injectIntl(LeftContainer);