import axios from 'axios'

export const HOST = "https://conduit.productionready.io"

export function getRequest(url) {

  return axios.get(`${HOST}${url}`, {
    headers: {
      "Authorization": "Token " + sessionStorage.getItem("real_world_token")
    }
  })
    .then(function (response) {
      return {
        data: response.data
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}

export function postRequest(url, data) {

  return axios.post(`${HOST}${url}`, data, {
    headers: {
      'Authorization': "Token " + sessionStorage.getItem("real_world_token")
    }
  })
    .then(function (response) {
      return { data: response.data, error: false }
    })
    .catch(function (error) {
      if (error.response) {
        return { data: error.response.data, error: true }
      } else {
        return { data: {}, error: true }
      }
    })
}