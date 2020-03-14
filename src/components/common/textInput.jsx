import React from "react"

const TextInput = ({ name, label }) => {
  return (
    <div className="form-group">
      <input
        className="form-control"
        type="text"
        id={name}
        name={name}
        placeholder={label}
      />
    </div>
  )
}

export default TextInput
