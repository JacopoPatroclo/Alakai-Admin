import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateEmail } from '../../lib/validators'

import Input from '../input/input';

class CreateUserForm extends Component {

  state = {
    data: {
      email: '',
      password: ''
    }
  }

  render() {
    let { onsubmit, loading, error } = this.props
    let { data } = this.state

    return (
      <div className="container">
        <Input label="Email" value={data.email} onChangeValidation={(value) => {
          this.setState((prec) => ({
            ...prec,
            data: {
              ...prec.data,
              email: value
            }
          }))
          return validateEmail(value)
        }} />
        <Input label="Password" value={data.password} onChangeValidation={(value) => {
          this.setState((prec) => ({
            ...prec,
            data: {
              ...prec.data,
              password: value
            }
          }))
          return { valid: true }
        }} />
        <button
          className={loading ? 'button is-primary is-loading' : 'button is-primary'}
          onClick={() => { onsubmit(data) }} >Crea</button>
        { error.message ? <p>{error.message}</p> : ''}
      </div>
    );
  }
}

CreateUserForm.propTypes = {
  onsubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
}

export default CreateUserForm;
