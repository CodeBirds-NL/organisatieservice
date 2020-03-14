import React from "react"

const TextAreaInput = ({ name, label, rows = 4 }) => {
  return (
    <div className="form-group">
      <textarea
        name={name}
        id={name}
        rows={rows}
        className="form-group"
        placeholder={label}
      />
    </div>
  )
}

export default TextAreaInput
