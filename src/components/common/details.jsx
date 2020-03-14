import React from "react"

const Details = ({ heading, children }) => {
  return (
    <div className="details">
      <h3>{heading}</h3>
      {children}
    </div>
  )
}

export default Details
