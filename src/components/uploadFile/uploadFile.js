import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './uploadFile.css'

import { uploadImages, uploadAudio } from '../../api/fileUpload'

class UploadFile extends Component {

  state = {
    currentFile: null,
    textButton: 'Carica un nuovo file',
    token: this.props.token,
    error: '',
    isLoading: false
  }

  componentDidUpdate() {
    if (this.state.token !== this.props.token) {
      this.setState({
        ...this.state,
        token: this.props.token
      })
    }
  }

  changeFile = (event) => {
    this.setState({
      ...this.state,
      currentFile: event.target.files[0],
      textButton: 'Invia file'
    })
  }

  chooseWhereUpload() {
    switch (this.props.accept.split('/')[0]) {
      case 'image':
        return uploadImages(this.state.token)(this.state.currentFile)
      case 'audio':
        return uploadAudio(this.state.token)(this.state.currentFile)
      default:
        return uploadImages(this.state.token)(this.state.currentFile)
    }
  }

  clickButton = () => {
   if (this.state.currentFile !== null) {
    this.setState({ ...this.state, isLoading: true })
    this.chooseWhereUpload()
      .then(response => {
        if (typeof this.props.getUploaded === 'function') {
          this.props.getUploaded(response)
        }
        this.setState({
          ...this.state,
          currentFile: null,
          textButton: 'Carica un altro file',
          error: '',
          isLoading: false
        })
      })
      .catch(error => {
        this.setState({
          ...this.state,
          currentFile: null,
          textButton: 'Carica un altro file',
          error: error.message,
          isLoading: false,
        })
      })
   } else {
    this.fileInput.click()
   }
  }

  annulla = () => {
    this.setState({
      ...this.state,
      currentFile: null,
      textButton: 'Carica un altro file',
    })
  }

  render() {
    return (
      <div className={this.props.className} >
        <input
          type="file" style={{ display: 'none' }}
          className="hiddenInput"
          accept={this.props.accept ? this.props.accept : 'image/*'}
          onChange={this.changeFile}
          ref={fileInput => this.fileInput = fileInput}/>

        <p className="has-text-dark is-size-5" >{this.state.currentFile ? this.state.currentFile.name : 'Nessun file'}</p>
        
        <button
          className={this.state.isLoading ? 'button is-fullwidth is-medium is-rounded is-loading' : 'button is-fullwidth is-medium is-rounded'}
          onClick={this.clickButton} >{this.state.textButton}</button>
        
        {(() => {
          if (this.state.currentFile) {
            return <button className="button is-fullwidth is-text" onClick={this.annulla}>Annulla</button>
          }
          return
        })()}
        
        <p className="has-text-danger is-size-5" >{this.state.error}</p>
      </div>
    )
  }

}

UploadFile.propTypes = {
  token: PropTypes.string,
  accept: PropTypes.string.isRequired,
  getUploaded: PropTypes.func
}

export default UploadFile