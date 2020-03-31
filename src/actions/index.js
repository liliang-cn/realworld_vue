import axios from "axios";

export const HOST = "https://conduit.productionready.io";

const headers = localStorage.getItem("real_world_token")
	? {
			Authorization: "Token " + localStorage.getItem("real_world_token")
	  }
	: {};

export function getRequest(url, params = {}) {
	return axios
		.get(`${HOST}${url}`, {
			headers,
			params
		})
		.then(function(response) {
			return {
				data: response.data,
				error: false
			};
		})
		.catch(function(error) {
			console.log(error);
			return {
				data: error,
				error: true
			};
		});
}

export function postRequest(url, data, auth = true) {
	return axios
		.post(`${HOST}${url}`, data, {
			headers: auth ? headers : {}
		})
		.then(function(response) {
			return { data: response.data, error: false };
		})
		.catch(function(error) {
			if (error.response) {
				return { data: error.response.data, error: true };
			} else {
				return { data: {}, error: true };
			}
		});
}

export function deleteRequest(url, auth = true) {
	return axios
		.delete(`${HOST}${url}`, {
			headers: auth ? headers : {}
		})
		.then(function(response) {
			return { data: response.data, error: false };
		})
		.catch(function(error) {
			if (error.response) {
				return { data: error.response.data, error: true };
			} else {
				return { data: {}, error: true };
			}
		});
}
