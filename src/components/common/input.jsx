import React from "react"

const Input = ({ type, name, label, onChange, selectOptions }) => {
  if (type === "textarea") return textArea(name, label, onChange)
  if (type === "radio") return radio(name, label, onChange)
  if (type === "select") return select(name, label, onChange, selectOptions)
  return (
    <div className="form-group">
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        placeholder={label}
        onChange={e => onChange(e)}
      />
    </div>
  )
}

const textArea = (name, label, onChange, rows = 4) => {
  return (
    <div className="form-group">
      <textarea
        name={name}
        id={name}
        rows={rows}
        className="form-control"
        placeholder={label}
        onChange={e => onChange(e)}
      />
    </div>
  )
}

const radio = (name, label, onChange) => {
  return (
    <label>
      <input
        name={name}
        value={label}
        type="radio"
        onChange={e => onChange(e)}
      />
      {label}
    </label>
  )
}

const select = (name, label, onChange, options) => {
  return (
    <div className="form-group">
      <select
        defaultValue={label}
        className="form-control"
        name={name}
        onChange={e => onChange(e)}
      >
        <option disabled value={label}>
          {label}
        </option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Input
