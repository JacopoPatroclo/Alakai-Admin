/*
 *  Audio and Image upload api utlilty
*/
import config from '../config'
import { parseResponseOrError } from '../lib/requestHandler'

const basePathApi = config.basePathApi

export const uploadImages = token => file => {
  const fd = new FormData()
  fd.append('image', file, file.name)
  return fetch(`${basePathApi}/api/rest/images`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: fd
  }).then(parseResponseOrError)
}

export const uploadAudio = token => file => {
  const fd = new FormData()
  fd.append('audio', file, file.name)
  return fetch(`${basePathApi}/api/rest/audio`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: fd
  }).then(parseResponseOrError)
}