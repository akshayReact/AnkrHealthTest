import axios from 'axios'

const axiosClient = axios.create()

axiosClient.defaults.baseURL = 'https://jsonfakery.com'

axiosClient.defaults.headers = {
    'Content-Type': 'application/json',
     Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  }

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = true

export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response)
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response)
}

export function postRequestHeader(URL, payload={}, headerPayload) {
  return axios.post(URL, payload, {headers:headerPayload}).then(response => response)
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response)
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response)
}
