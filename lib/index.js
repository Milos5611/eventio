//3rd party libs
import {IntlProvider} from 'react-intl';
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

//general views
import App from "./component/app/App";

import {addLocaleData} from "react-intl";
import de from "react-intl/locale-data/de";
import en from "react-intl/locale-data/en";

addLocaleData([...de, ...en]);

//styling
import "./index.scss";

const FullApp = () => {
	return (
		<IntlProvider store={store}>
			<Provider store={store}>
				<Router history={history}>
					<Route path="/" component={App}>
						<IndexRedirect to="login"/>
						<Route path="login" component={LoginContainer}/>
						<Route path="*" component={App}>
							<IndexRedirect to="/"/>
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
