import React, { Component } from 'react'

import { doLogin } from '../../lib/auth'
import Input from '../../components/input/input'
import { validateEmail } from '../../lib/validators'

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    loading: false,
    error: false,
    errorMessage: ''
  }

  dologin = () => {
    this.setState({
      ...this.state,
      loading: true
    })
    doLogin(this.state)
      .then(() => {
        if (window.location.pathname === '/login') {
          window.location.replace('/')
        } else {
          window.location.reload()
        }
      })
      .catch(error => {
        this.setState({
          ...this.state,
          error: true,
          errorMessage: error.message,
          loading: false
        })
      })
  }

  render() {
    return (
      <div className="container is-fluid" style={{ textAlign: 'left' }}>
        <div className="columns">
          <div className="column">
            <Input label="Email" onChangeValidation={value => {
              this.setState({
                ...this.state,
                email: value
              })
              return validateEmail(value)
            }}/>
          </div>
          <div className="column">
            <Input label="Password" onChangeValidation={(value) => {
              this.setState({
                ...this.state,
                password: value
              })
              return { valid: true } 
            }}/>
          </div>
        </div>
        <a
        className={this.state.loading ? 'button is-primary is-loading' : 'button is-primary'}
        onClick={this.dologin} >Login</a>
        { this.state.error ? <p className="is-size-6 has-text-danger" >{this.state.errorMessage}</p> : '' }
      </div>
    )
  }

}

export default LoginPage