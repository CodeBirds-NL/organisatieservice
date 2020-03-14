import React from "react"

const RadioInput = ({ name, label }) => {
  return (
    <label>
      <input name={name} value={label} type="radio" />
      {label}
    </label>
  )
}

export default RadioInput
