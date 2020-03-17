import React from "react"

const Emoji = ({ label, symbol = "" }) => {
  if (!symbol) return null
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
    >
      {symbol}
    </span>
  )
}

export default Emoji
