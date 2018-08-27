import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validateEmail } from '../../lib/validators'

import Input from '../input/input';

class UpdateUserForm extends Component {
  state = {
    data: {
      email: this.props.user.email,
      password: ''
    }
  }

  render() {
    let { user, onsubmit, loading, error } = this.props
    let { data } = this.state

    return (
      <div className="container">
        <Input label="Email" value={user.email ? user.email : ''} onChangeValidation={(value) => {
          this.setState((prec) => ({
            ...prec,
            data: {
              ...prec.data,
              email: value
            }
          }))
          return validateEmail(value)
        }} />
        <Input label="Password" onChangeValidation={(value) => {
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
          onClick={() => { onsubmit(data) }} >Aggiorna</button>
        { error.message ? <p>{error.message}</p> : ''}
      </div>
    );
  }
}

UpdateUserForm.propTypes = {
  user: PropTypes.object.isRequired,
  onsubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object
}

export default UpdateUserForm;
