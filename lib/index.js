//3rd party libs
import {IntlProvider} from "react-intl";
import React from "react";
import {render} from "react-dom";
import domready from "domready";
import {Provider} from "react-redux";
import Router from "react-router/lib/Router";
import Route from "react-router/lib/Route";
import IndexRedirect from "react-router/lib/IndexRedirect";

//custom libs
import history from "./common/history";
import store from "./common/store";

import LoginContainer from "../lib/component/login/LoginContainer";
import EventsContainer from "../lib/component/events/EventsContainer";
import EventDetailContainer from "../lib/component/events/EventDetailContainer";

//general views
import App from "./component/app/App";

//styling
import "./index.scss";

const FullApp = () => {
	return (
		<IntlProvider locale="en">
			<Provider store={store}>
				<Router history={history}>
					<Route path="/" component={App}>
						<IndexRedirect to="login"/>
						<Route path="login" component={LoginContainer}>
							<IndexRedirect to="/events"/>
							<Route path="/events" component={EventsContainer}/>
							<Route path="/detail" component={EventDetailContainer}/>
						</Route>
					</Route>
				</Router>
			</Provider>
		</IntlProvider>
	);
};

domready(() => {
	render(
		<FullApp />,
		document.getElementById("app")
	);
});
