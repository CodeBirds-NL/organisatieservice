import React, { Component } from "react"
import Input from "./input"
import Button from "./button"
import Emoji from "./emoji"

class Form extends Component {
  state = {
    data: {},
  }

  contactInputs = {
    name: { name: "name", label: "Naam" },
    companyName: { name: "companyName", label: "Bedrijfsnaam" },
    phone: { type: "tel", name: "phone", label: "Telefoonnummer" },
    email: { type: "email", name: "email", label: "Email" },
    address: { name: "address", label: "Adres" },
  }

  getContactFields = contactOption => {
    const { name, companyName, phone, email } = this.contactFields
    switch (contactOption) {
      case "Terugbelverzoek":
        return [name, phone]
        break
      default:
        return [companyName, email]
        break
    }
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
    const { nextStep, onNextStep } = this.props

    if (!nextStep) return onNextStep(this.state.data.contactOption)
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

  renderForm = (detailsTitle = "", inputs, options, contactInputs, button) => {
    const { nextStep } = this.props
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
