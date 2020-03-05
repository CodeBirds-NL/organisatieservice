import React from "react"

const Button = ({ label, type }) => {
  return <button className={`btn ${type}`}>{label}</button>
}

export default Button
