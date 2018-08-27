/*
 *  Settings api utlilty
*/

import config from '../config'
import { parseResponseOrError } from '../lib/requestHandler'

const basePathApi = config.basePathApi

export const getSupportedLanguage = (token) => {
  return fetch(`${basePathApi}/api/rest/settings/languages`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then(parseResponseOrError)
}