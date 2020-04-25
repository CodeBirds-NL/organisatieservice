import React, { Fragment } from "react"
import Form from "./common/form"
import SuccessMessage from "./common/successMessage"

class Administratie extends Form {
  state = {
    data: {},
  }

  inputs = [
    { name: "question", label: "Vraag/probleem" },
    { type: "textarea", name: "summary", label: "Omschrijf nader..." },
  ]

  render() {
    const { id, options } = this.props.data
    const { nextStep, submitted } = this.props
    const { name } = this.state.data
    // query data is pulled in here
    const { title, text } = this.props.queryData

    return (
      <Fragment>
        {submitted ? (
          <SuccessMessage name={name} />
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
                "Contactopties"
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

export default Administratie
