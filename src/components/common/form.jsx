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

    if (!this.state.nextStep) return this.handleNextStep()
    console.log("form submitted!")

    // get formdata
    // call server
  }

  handleNextStep = _ => {
    // check if contactOption is selected
    const { contactOption } = this.state.data
    if (!contactOption) return
    // hide current form and show up next form
    this.setState({ nextStep: true })
    // this.setState({ step: 2 })
  }

  renderHeading = main => <div className="heading">{main}</div>
  renderSubHeading = (sub, symbol) => (
    <div className="subHeading">
      {sub} <Emoji symbol={symbol} />
    </div>
  )

  renderForm = (detailsTitle = "", inputs, options, contactInputs, button) => {
    const { nextStep } = this.state
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <div className={nextStep ? "actionData" : "show actionData"}>
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
            <div className="next right">
              {this.renderButton("full", "Volgende")}
            </div>
          </div>
          <div className={nextStep ? "show contactData" : "contactData"}>
            <div className="details">
              <h3> Uw Contactgegevens</h3>
              {contactInputs.map(({ type = "text", name, label }) => (
                <Input
                  key={name}
                  name={name}
                  type={type}
                  label={label}
                  onChange={this.handleChange}
                />
              ))}
            </div>
            <div className="submit right">{button}</div>
          </div>
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
    return <Button onClick type={type} label={label} color={color} />
  }
}

export default Form
