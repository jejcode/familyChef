import React from "react"
import { Link } from "react-router-dom"
const PageLinks = (props) => {
  const {addLinks} = props
  return (
    <div className="d-flex justify-content-end">
      {addLinks && addLinks.map((info, index) => {
        return (
          <span>
            <Link to={info.href} className="mx-2">{info.text}</Link>|
          </span>
        )
      })}
      <Link to="/dashboard" className="ms-2">Home</Link>
    </div>
  )
}

export default PageLinks