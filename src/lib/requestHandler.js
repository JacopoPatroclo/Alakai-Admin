/*
 *  Request handlers methods
*/

export const parseResponseOrError = res => {
  if (res.ok) {
    if(res.status === 201) return {}
    return res.json()
  } else {
    return res.json()
      .then(errorResponse => {
        throw new Error(errorResponse.err)
      })
  }
}