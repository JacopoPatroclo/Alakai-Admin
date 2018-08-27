import React from 'react'

const Footer = (props) => (
  <footer className="footer">
    <div className="content has-text-centered">
    <p>Supported Language</p>
    { props.languages.map((language, index) => (
      <p key={index} >{language.name}</p>
    ))}
    </div>
  </footer>
)

export default Footer