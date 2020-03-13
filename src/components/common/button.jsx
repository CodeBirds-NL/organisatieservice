import React from "react"

const Button = ({ label, type, color }) => {
  return <button className={`btn ${type} ${color}`}>{label}</button>
}

export default Button
