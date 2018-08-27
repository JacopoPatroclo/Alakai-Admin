import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { createPoint, getOne, updatePoint } from '../../api/point'
import Input from '../../components/input/input'
import UploadFiles from '../../components/uploadFile/uploadFile'
import { ImageCarouser } from '../../components/imageCarousel'
import { InfoPoint } from '../../components/infoPoint'

import { validateSlug } from '../../lib/validators'

import config from '../../config'

class PointPage extends Component {

  state = {
    loading: false,
    error: false,
    errorMessage: '',
    point: this.props.point ? this.props.point : {
      name: [],
      description: [],
      info: [],
      audio: [],
      images: [],
      location: {}
    }
  }

  componentDidMount = () => {
    if(this.props.point) {
      this.setState((prev, props) => ({
        ...prev,
        point: props.point
      }))
    }
  }

  componentDidUpdate() {
    if(this.props.point_id && this.props.isLoggedIn && !this.state.point.id) {
      getOne(this.props.isLoggedIn)(this.props.point_id)
        .then(point => {
          const newPoint = {
            ...point,
            description: this._from_array_to_object(point.description),
            info: this._from_array_to_object(point.info),
            name: this._from_array_to_object(point.name)
          }
          console.log(newPoint)
          this.setState((prev) => ({
            ...prev,
            point: newPoint
          }))
        })
        .catch(err => console.log(err))
    }
  }

  _from_object_to_array (object) {
    const list = []
    for(let key in object) {
      list.push({
        language_code: key,
        text: object[key]
      })
    }
    return list
  }

  _from_array_to_object (array) {
    const object = {}
    for (let index = 0; index < array.length; index++) {
      object[array[index].language_code] = array[index].text
    }
    return object
  }

  createpoint = () => {
    this.setState((prev) => ({
      ...prev,
      loading: true
    }))
    const point = {
      ...this.state.point,
      name: this._from_object_to_array(this.state.point.name),
      description: this._from_object_to_array(this.state.point.description),
      info: this._from_object_to_array(this.state.point.info)
    }
    if (this.state.point.id) {
      updatePoint(this.props.isLoggedIn)(this.state.point.id)(point)
        .then(() => {
          this.setState((prev) => ({
            ...prev,
            loading: false
          }))
        })
        .catch(error => {
          this.setState((prev) => ({
            ...prev,
            error: true,
            errorMessage: error.message,
            loading: false
          }))
        })
    } else {
      createPoint(this.props.isLoggedIn)(point)
        .then(newPoint => {
          this.setState((prev) => ({
            ...prev,
            point: newPoint,
            loading: false
          }))
        })
        .catch(error => {
          this.setState((prev) => ({
            ...prev,
            error: true,
            errorMessage: error.message,
            loading: false
          }))
        })
    }
  }

  saveInPoint = (key, value, subKey) => {
    const point = this.state.point
    if (typeof subKey !== 'undefined') {
      point[key][subKey] = value
    } else {
      point[key] = value
    }
    this.setState((prev) => ({
      ...prev,
      point
    }))
  }

  validateAndSave = (key, subKey) => {
    switch (key) {
      case 'slug':
        return (value) => {
          this.saveInPoint('slug', value)
          return validateSlug(value)
        }
      case 'name':
        return (value) => {
          this.saveInPoint('name', value, subKey)
          return { valid: true }
        }
      case 'description':
        return (value) => {
          this.saveInPoint('description', value, subKey)
          return { valid: true }
        }
      case 'info':
        return (value) => {
          this.saveInPoint('info', value, subKey)
          return { valid: true }
        }
      case 'location':
        return (value) => {
          this.saveInPoint('location', value, subKey)
          return subKey === 'slug' ? validateSlug(value) : { valid: true }
        }
      default:
        break;
    }
  }

  mediaUploaded = (typology, lang_code) => {
    return ({ fileName }) => {
      if (typology === 'audio') {
        const newAudio = {
          language_code: lang_code,
          text: fileName
        }
        this.saveInPoint('audio', [...this.state.point.audio, newAudio])  
      } else {
        this.saveInPoint('images', [...this.state.point.images, fileName])
      }
    }
  }

  render() {
    return (
      <div className="container">
        <InfoPoint point={this.state.point} />
        <div className="columns" style={{ textAlign: 'left' }}>
          <div className="column is-two-thirds">
            <Input
            value={this.state.point.slug}
            label="Slug"
            onChangeValidation={this.validateAndSave('slug')} />
          </div>
        </div>
        <div className="columns" style={{ textAlign: 'left' }}>
          <div className="column is-half">
          { this.props.languages.map(({ name, code }, index) => (
              <Input
              key={index}
              value={this.state.point.name[code]}
              label={`Name (${name})`}
              onChangeValidation={this.validateAndSave('name', code)} />
          )) }
          </div>
          <div className="column is-half">
          { this.props.languages.map(({ name, code }, index) => (
              <Input
              isTextArea={true}
              key={index}
              value={this.state.point.info[code]}
              label={`Info (${name})`}
              onChangeValidation={this.validateAndSave('info', code)} />
          )) }
          </div>
        </div>
        <div className="column">
          <p>Location</p>
          <Input
          value={this.state.point.location.slug}
          label="Slug"
          onChangeValidation={this.validateAndSave('location', 'slug')} />
          <div className="columns">
            <div className="column">
              <Input
              value={this.state.point.location.lat}
              label="Lat"
              onChangeValidation={this.validateAndSave('location', 'lat')} />
            </div>
            <div className="column">
              <Input
              value={this.state.point.location.lng}
              label="Long"
              onChangeValidation={this.validateAndSave('location', 'lng')} />
            </div>
          </div>
        </div>
        <div className="columns" style={{ textAlign: 'left' }}>
          <div className="column">
          { this.props.languages.map(({ name, code }, index) => (
              <Input
              isTextArea={true}
              key={index}
              value={this.state.point.description[code]}
              label={`Description (${name})`}
              onChangeValidation={this.validateAndSave('description', code)} />
          )) }
          </div>
        </div>
        <p className="is-size-3" >Audio</p>
        <div className="columns" style={{ textAlign: 'left' }}>
          { this.state.point.audio.map((audio, index) => (
            <div className="column" key={index}>
              <p className="is-size-6">{`Audio in ${audio.language_code}  ${audio.text}`}</p>
              <audio controls>
                <source src={config.basePathApi + audio.text} />
              </audio>
            </div>
          )) }
        </div>
        <div className="columns" style={{ textAlign: 'left' }}>
          { this.props.languages.map(({ name, code }, index) => (
            <div className="column" key={index}>
              <p className="is-size-6">{`Audio in ${name}`}</p>
              <UploadFiles
              token={this.props.isLoggedIn}
              getUploaded={this.mediaUploaded('audio', code)}
              key={index}
              accept="audio/*"  />
            </div>
          )) }
        </div>
        <p className="is-size-3" >Immagini</p>
        <div className="columns" style={{ textAlign: 'left' }}>
          <div className="column" >
            <ImageCarouser images={this.state.point.images ? this.state.point.images.map(src => `${config.basePathApi}${src}`): []} />
          </div>
        </div>
        <div className="columns" style={{ textAlign: 'left' }}>
          <UploadFiles
          token={this.props.isLoggedIn}
          getUploaded={this.mediaUploaded('images')} accept="image/*"  />
        </div>
        <button
        className={this.state.loading ? 'button is-primary is-loading' : 'button is-primary'}
        onClick={this.createpoint} >
          { this.state.point.id ? 'Update Point' : 'Create Point' }
        </button>
        { this.state.error ? (<p className="is-size-5 is-text-danger" >{this.state.errorMessage}</p>) : '' }
      </div>
    )
  }

}

PointPage.propTypes = {
  point: PropTypes.object,
  languages: PropTypes.array.isRequired,
  point_id: PropTypes.string,
  isLoggedIn: PropTypes.string,
  lng: PropTypes.string.isRequired
}

export default PointPage