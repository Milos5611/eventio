import {Base64} from "js-base64";
import reqwest from "reqwest";

import store from "./store";

const key = "6A5GdcgZCYVBp1nexk8Vgp7JB8Z5AXFqQWwHWa7heVwU";
const API_KEY = "apikey";
const AUTHORIZATION_KEY = "Authorization";
const ACCEPT_KEY = "Accept";
const CONTENT_TYPE_KEY = "Content-Type";
const CROSS_ORIGIN_KEY = "crossOrigin";
const HEADERS_KEY = "headers";
const METHOD_KEY = "method";
const TYPE_KEY = "type";

const BODY = "data";
const APPLICATION_JSON = "application/json";
const JSON_VALUE = "json";
const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";

class Rest {
	
	doLogin(url, username, password) {
		const body = {
			"email": username,
			"password": password
		};
		const userRequest = reqwest({
			url,
			[METHOD_KEY]: POST,
			[HEADERS_KEY]: {
				[CONTENT_TYPE_KEY]: APPLICATION_JSON,
				[API_KEY]: key,
			},
			[BODY]: JSON.stringify(body)
			// TODO: Try some other library, reqwest even is good it is terrible for retrieving header
		}).then(user => {
			return {
				user: user,
				auth: userRequest.request.getResponseHeader(AUTHORIZATION_KEY)
			}
		});
		
		return userRequest;
	}
	
	doGet(url) {
		const requestOptions = {
			url,
			[METHOD_KEY]: GET,
			[CROSS_ORIGIN_KEY]: process.env.NODE_ENV !== "production",
			[HEADERS_KEY]: {
				[API_KEY]: key,
				[CONTENT_TYPE_KEY]: APPLICATION_JSON,
			}
		};
		return reqwest(requestOptions);
	}
	
	doPost(url, data) {
		const requestOptions = {
			url,
			[METHOD_KEY]: POST,
			[HEADERS_KEY]: {
				[CONTENT_TYPE_KEY]: APPLICATION_JSON,
				[API_KEY]: key,
				[AUTHORIZATION_KEY]: store.login.token
			},
			[BODY]: JSON.stringify(data)
		};
		return reqwest(requestOptions);
	}
	
	doPatch(url, data) {
		const requestOptions = {
			url,
			[TYPE_KEY]: JSON_VALUE,
			[METHOD_KEY]: PATCH,
			[HEADERS_KEY]: {
				[API_KEY]: key,
				[CONTENT_TYPE_KEY]: APPLICATION_JSON,
				[AUTHORIZATION_KEY]: store.login.token
			},
			data
		};
		return reqwest(requestOptions);
	}
	
	doDelete(url, data) {
		const requestOptions = {
			url,
			[TYPE_KEY]: JSON_VALUE,
			[METHOD_KEY]: DELETE,
			[CROSS_ORIGIN_KEY]: process.env.NODE_ENV !== "production",
			[HEADERS_KEY]: {
				[API_KEY]: key,
				[CONTENT_TYPE_KEY]: APPLICATION_JSON
			},
			data
		};
		return reqwest(requestOptions);
	}
}

export default new Rest();
