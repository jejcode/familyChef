import React from "react"
import { Link } from "react-router-dom"
const PageLinks = () => {
  return (
    <div className="d-flex justify-content-end">
      <Link to="/chef/dashboard">Home</Link>
    </div>
  )
}

export default PageLinks