import React from "react"
import RadioInput from "./radioInput"

const Options = ({ options, heading, name }) => {
  console.log(options)

  return (
    <div className="options">
      <h3>{heading}</h3>
      <div className="form-group">
        <ul>
          {/* map each contact option to radio input */}
          {options.map(option => (
            <li key={option}>
              <RadioInput name={name} label={option} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Options
