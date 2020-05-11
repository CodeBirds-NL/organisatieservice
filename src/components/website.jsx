import React, { Fragment } from "react"
import Form from "./common/form"
import SuccessMessage from "./common/successMessage"

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
    const { nextStep, submitted } = this.props
    const { title, text } = this.props.queryData

    return (
      <Fragment>
        {submitted ? (
          <SuccessMessage name={this.state.data.name} />
        ) : (
          <div className="formWrapper" data-actionid={id}>
            {this.renderHeading(`${nextStep ? "2/2" : "1/2"} ${title}`)}
            {this.renderSubHeading(text)}
            {this.renderForm(
              "Details",
              this.inputs,
              this.renderRadioOptions(
                options,
                "contactOption",
                "Contact Opties"
              ),
              Object.values(this.contactInputs),
              this.renderButton("full", "Verstuur")
            )}
          </div>
        )}
      </Fragment>
    )
  }
}

export default Website
