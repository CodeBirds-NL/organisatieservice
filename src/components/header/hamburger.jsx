import React, { Component } from "react"
import "./hamburger.css"

const Hamburger = ({ onToggle }) => {
  return (
    <div onClick={onToggle} id="nav-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Hamburger
