import React, { Component } from "react"
import Input from "./input"
import Button from "./button"
import Emoji from "./emoji"

class Form extends Component {
  state = {
    data: {},
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data }
    data[input.name] = input.value
    this.setState(() => {
      return { data }
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log("form submitted!")

    // get formdata
    // call server
  }

  renderHeading = main => <div className="heading">{main}</div>
  renderSubHeading = (sub, symbol) => (
    <div className="subHeading">
      {sub} <Emoji symbol={symbol} />
    </div>
  )

  renderForm = (detailsTitle = "", inputs, options, button) => {
    return (
      <div className="actions">
        <form onSubmit={this.handleSubmit}>
          <div className="details">
            <h3>{detailsTitle}</h3>
            {/* check if inputs is an array or component defined render function*/}
            {Array.isArray(inputs)
              ? inputs.map(
                  ({ type = "text", name, label, selectOptions = "" }) => (
                    <Input
                      key={name}
                      name={name}
                      type={type}
                      label={label}
                      onChange={this.handleChange}
                      selectOptions={selectOptions}
                    />
                  )
                )
              : inputs}
          </div>
          {options}
          <div className="submit right">{button}</div>
        </form>
      </div>
    )
  }

  renderRadioOptions = (options, name, heading = "") => {
    return (
      <div className="options">
        <h3>{heading}</h3>
        <div className="form-group">
          <ul>
            {options.map(option => (
              <li key={option}>
                <Input
                  type="radio"
                  name={name}
                  label={option}
                  onChange={this.handleChange}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderButton = (type, label, color = "") => {
    return <Button type={type} label={label} color={color} />
  }
}

export default Form
