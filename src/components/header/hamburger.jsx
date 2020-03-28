import React from "react"
import "./hamburger.scss"

const Hamburger = ({ onToggle }) => {
  return (
    <div role="toggle" onClick={onToggle} id="nav-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Hamburger
