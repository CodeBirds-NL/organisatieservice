import React from "react"
import "./hamburger.scss"

const Hamburger = ({ page, onToggle }) => {
  return (
    <div
      role="toggle"
      onClick={onToggle}
      id="nav-icon"
      className={page === "contact" ? "contact" : ""}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Hamburger
