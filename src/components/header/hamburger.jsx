import React from "react"
import "./hamburger.scss"

const Hamburger = ({ onToggle }) => {
  return (
    <div onClick={onToggle} id="nav-icon" role="toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Hamburger
