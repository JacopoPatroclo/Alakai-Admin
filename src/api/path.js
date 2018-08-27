/*
 *  Path api utlilty
*/

import config from '../config'
import { parseResponseOrError } from '../lib/requestHandler'

const basePathApi = config.basePathApi

export const createPath = token => data => {
  return fetch(`${basePathApi}/api/rest/path`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then(parseResponseOrError)
}

export const updatePath = token => id => data => {
  return fetch(`${basePathApi}/api/rest/path/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then(parseResponseOrError)
}

export const deletePath = token => id => {
  return fetch(`${basePathApi}/api/rest/path/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(parseResponseOrError)
}

export const getOne = token => id => lng => {
  return fetch(`${basePathApi}/api/rest/point/${id}?lng=${lng}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(parseResponseOrError)
}

export const getAll = token => lng => {
  return fetch(`${basePathApi}/api/rest/point?lng=${lng}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(parseResponseOrError)
}