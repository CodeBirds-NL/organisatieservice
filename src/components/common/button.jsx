import React from "react"

const Button = ({ type, label, color }) => {
  return <button className={`btn ${type} ${color}`}>{label}</button>
}

export default Button
