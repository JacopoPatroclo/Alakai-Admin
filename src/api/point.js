/*
 *  Points api utlilty
*/

import config from '../config'
import { parseResponseOrError } from '../lib/requestHandler'

const basePathApi = config.basePathApi

export const createPoint = token => data => {
  return fetch(`${basePathApi}/api/rest/point`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then(parseResponseOrError)
}

export const updatePoint = token => id => data => {
  return fetch(`${basePathApi}/api/rest/point/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then(parseResponseOrError)
}

export const insertInToPath = token => id => path_id => position => {
  return fetch(`${basePathApi}/api/rest/point/${id}/insert/${path_id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify({ position })
  }).then(parseResponseOrError)
}

export const deletePoint = token => id => {
  return fetch(`${basePathApi}/api/rest/point/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(parseResponseOrError)
}

export const getOne = token => id => {
  return fetch(`${basePathApi}/api/rest/point/admin/${id}`, {
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