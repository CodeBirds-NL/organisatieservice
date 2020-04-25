import React from "react"
import Form from "./common/form"

class Website extends Form {
  state = {
    data: {},
  }

  inputs = [
    { name: "websiteName", label: "Websiteadres (https://example.com)" },
    { name: "websitePurpose", label: "Doel website" },
  ]

  render() {
    const { id, options } = this.props.data
    const { nextStep } = this.props
    const { title, text } = this.props.queryData

    return (
      <div className="formWrapper" data-actionid={id}>
        {this.renderHeading(`${nextStep ? "2/2" : "1/2"} ${title}`)}
        {this.renderSubHeading(text)}
        {this.renderForm(
          "Details",
          this.inputs,
          this.renderRadioOptions(options, "contactOption", "Contact Opties"),
          Object.values(this.contactInputs),
          this.renderButton("full", "Verstuur")
        )}
      </div>
    )
  }
}

export default Website
