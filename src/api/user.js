/*
 *  User api utlilty
*/

import config from '../config'
import { parseResponseOrError } from '../lib/requestHandler'

const basePathApi = config.basePathApi

export const logIn = (email, password) => {
  return fetch(`${basePathApi}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(parseResponseOrError)
}

export const getData = token => {
  return fetch(`${basePathApi}/api/rest/user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
  }).then(parseResponseOrError)
}

export const updateData = token => (userData) => {
  return fetch(`${basePathApi}/api/rest/user`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(userData)
  }).then(res => res.ok)
}

export const createOne = token => ({ email, password }) => {
  return fetch(`${basePathApi}/api/rest/user`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({
      email,
      password
    })
  }).then(parseResponseOrError)
}