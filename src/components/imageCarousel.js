import React from 'react'

export const ImageCarouser = (props) => {
  return props.images ? (
    <div className="columns" style={{ height: 200 }}>
      { props.images.map((imageSrc, index) => (
        <div key={index} className="column">
          <figure className="image is-128x128">
            <img alt="Point immage" style={{ height: 128, width: 128 }} src={imageSrc} />
          </figure>
        </div>
      )) }
    </div>
  ) : ''
}