import {Base64} from "js-base64";
import reqwest from "reqwest";

import store from "./store";

const AUTHORIZATION_KEY = "APIKey";
const ACCEPT_KEY = "Accept";
const CONTENT_TYPE_KEY = "Content-Type";
const CROSS_ORIGIN_KEY = "crossOrigin";
const HEADERS_KEY = "headers";
const METHOD_KEY = "method";
const TYPE_KEY = "type";

const BODY = "body";
const APPLICATION_JSON = "application/json";
const JSON_VALUE = "json";
const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

class Rest {
	
	doLogin(url, username, password) {
		const body = {
				"email": username,
				"password": password
			},
			requestOptions = {
				url,
				[TYPE_KEY]: JSON_VALUE,
				[METHOD_KEY]: POST,
				[CROSS_ORIGIN_KEY]: process.env.NODE_ENV !== "production",
				[HEADERS_KEY]: {
					[ACCEPT_KEY]: APPLICATION_JSON,
					[AUTHORIZATION_KEY]: "6A5GdcgZCYVBp1nexk8Vgp7JB8Z5AXFqQWwHWa7heVwU",
				},
				[BODY]: JSON.stringify(body)
			};
		return reqwest(requestOptions);
	}
	
	doGet(url, accept = APPLICATION_JSON) {
		const requestOptions = {
			url,
			[TYPE_KEY]: accept === "text/csv" ? "text" : JSON_VALUE,
			[METHOD_KEY]: GET,
			[CROSS_ORIGIN_KEY]: process.env.NODE_ENV !== "production",
			[HEADERS_KEY]: {
				[AUTHORIZATION_KEY]: "6A5GdcgZCYVBp1nexk8Vgp7JB8Z5AXFqQWwHWa7heVwU",
				[ACCEPT_KEY]: accept
			}
		};
		return reqwest(requestOptions);
	}
	
	doPost(url, data) {
		const requestOptions = {
			url,
			[TYPE_KEY]: JSON_VALUE,
			[METHOD_KEY]: POST,
			[CROSS_ORIGIN_KEY]: process.env.NODE_ENV !== "production",
			[HEADERS_KEY]: {
				[AUTHORIZATION_KEY]: "6A5GdcgZCYVBp1nexk8Vgp7JB8Z5AXFqQWwHWa7heVwU",
				[ACCEPT_KEY]: APPLICATION_JSON,
				[CONTENT_TYPE_KEY]: APPLICATION_JSON
			},
			data
		};
		return reqwest(requestOptions);
	}
	
	doPut(url, data) {
		const requestOptions = {
			url,
			[TYPE_KEY]: JSON_VALUE,
			[METHOD_KEY]: PUT,
			[CROSS_ORIGIN_KEY]: process.env.NODE_ENV !== "production",
			[HEADERS_KEY]: {
				[AUTHORIZATION_KEY]: "6A5GdcgZCYVBp1nexk8Vgp7JB8Z5AXFqQWwHWa7heVwU",
				[ACCEPT_KEY]: APPLICATION_JSON,
				[CONTENT_TYPE_KEY]: APPLICATION_JSON
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
				[AUTHORIZATION_KEY]: "6A5GdcgZCYVBp1nexk8Vgp7JB8Z5AXFqQWwHWa7heVwU",
				[CONTENT_TYPE_KEY]: APPLICATION_JSON
			},
			data
		};
		return reqwest(requestOptions);
	}
}

export default new Rest();
