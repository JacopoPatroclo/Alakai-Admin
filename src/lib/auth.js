import { logIn } from '../api/user'
import jwtDecode from 'jwt-decode'

const tokenKey = 'auth_key_user'

export const IsLoggedIn = () => {
  if (sessionStorage.getItem(tokenKey)) {
    try {
      const dateNow = Number((((new Date()).getTime()) / 1000).toFixed(0))
      const decodeToken = jwtDecode(sessionStorage.getItem(tokenKey))
      return decodeToken.exp > dateNow ? sessionStorage.getItem(tokenKey) : null
    } catch (error) {
      console.log(error)
      return null
    }
  } else {
    return null
  }
}

export const doLogin = ({ email, password }) => {
  return logIn(email, password)
    .then(({token}) => {
      sessionStorage.setItem(tokenKey, token)
      return { token }
    })
}

export const logOut = () => {
  sessionStorage.removeItem(tokenKey)
}


export const ProtectedRoute = (component, Login) => {
  if (IsLoggedIn()) {
    return component
  } else {
    if (typeof component === 'function') {
      return () => Login
    } else {
      return Login
    }
  }
}
