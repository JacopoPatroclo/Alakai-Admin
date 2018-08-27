import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {

  state = {
    value: '',
    errorMessage: '',
    error: false
  }

  textIsChange = ($event) => {
    const text = $event.target.value
    const validation = this.props.onChangeValidation(text)
    if (validation.valid) {
      this.setState({
        value: text,
        errorMessage: '',
        error: false
      })
    } else {
      this.setState({
        value: text,
        errorMessage: validation.message,
        error: true
      })
    }
  }

  render() {
    return (
      <div className="field">
        <label className="label">{this.props.label}</label>
        <div className="control">
          { this.props.isTextArea ? (
            <textarea
            onChange={this.textIsChange}
            className={this.state.error ? 'textarea is-danger' : 'textarea is-success'}
            value={this.props.value && this.state.value === '' ? this.props.value : this.state.value}
            placeholder={this.props.label}></textarea>
          ) : (
            <input
            onChange={this.textIsChange}
            className={this.state.error ? 'input is-danger' : 'input is-success'}
            type={this.props.label.toLowerCase() === 'password' ? 'password' : 'text'}
            value={this.props.value && this.state.value === '' ? this.props.value : this.state.value}
            placeholder={this.props.label} />)}
        </div>
        { this.state.error ? <p className="help is-danger">{this.state.errorMessage}</p> : <p></p> }
      </div>
    )
  }

}

Input.propTypes = {
  onChangeValidation: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string
}

export default Input