//3rd party libs
import { IntlProvider } from "react-intl";
import React from "react";
import { render } from "react-dom";
import domready from "domready";
import { Provider } from "react-redux";
import Router from "react-router/lib/Router";
import Route from "react-router/lib/Route";
import IndexRedirect from "react-router/lib/IndexRedirect";
import injectTapEventPlugin from "react-tap-event-plugin";

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";

//custom libs
import history from "./common/history";
import store from "./common/store";

import LoginContainer from "../lib/component/login/LoginContainer";
import SignUpContainer from "./component/signUp/SignUpContainer";
import EventsContainer from "../lib/component/events/EventsContainer";
import EventDetailContainer from "../lib/component/events/EventDetailContainer";
import UserProfileContainer from "../lib/component/user/UserProfileContainer";

//localization
import enMessages from "./common/i18n/messagesEn";
const EN = "en";

//this if is a Safari hack. Because safari doesn't support by default Intl.
//more about this topic: https://github.com/andyearnshaw/Intl.js/
if ( !window.intl ) {
    window.intl = require("intl");
    window.intl.polyFill = true;
    require("intl/locale-data/jsonp/en.js");
    require("intl/locale-data/jsonp/de.js");
}

//general views
import App from "./component/app/App";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

addLocaleData([ ...en ]);

//styling
import "./index.scss";

const FullApp = () => {
    return (
        <IntlProvider locale={EN} defaultLocale={EN} messages={enMessages}>
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={App}>
                        <IndexRedirect to="login"/>
                        <Route path="login" component={LoginContainer}>
                            <IndexRedirect to="/events"/>
                            <Route path="/events" component={EventsContainer}/>
                            <Route path="/detail" component={EventDetailContainer}/>
                            <Route path="/profile" component={UserProfileContainer}/>
                        </Route>
                        <Route path="/signUp" component={SignUpContainer}/>
                    </Route>
                    <Route path="*" component={App}>
                        <IndexRedirect to="/"/>
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
