import React from 'react'

export const InfoPoint = (props) => {
  return props.point.id ? 
    (<div className="container">
      <p className="is-size-4" >Point Info</p>
      <div>
        <p className="is-size-6">ID: {props.point.id}, CREATEDAT: {props.point.createdAt}, UPDATEDAT: {props.point.updatedAt}</p>
      </div>
    </div>) :
    (<div>
      <p className="is-size-4" >Create Point</p>
    </div>)
}