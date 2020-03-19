import React from "react"
import Form from "./common/form"

class Marketing extends Form {
  state = {
    data: {},
  }

  inputs = [
    { name: "question", label: "Vraag/probleem" },
    {
      type: "select",
      name: "marketingCanal",
      label: "Marketing kanaal",
      selectOptions: [
        "brochure",
        "advertentie",
        "sociale media",
        "online marketing",
      ],
    },
    { type: "textarea", name: "summary", label: "Omschrijf nader..." },
  ]

  render() {
    const { id, options } = this.props.data
    const { nextStep } = this.props

    return (
      <div className="formWrapper" data-actionid={id}>
        {this.renderHeading(`${nextStep ? "2/2" : "1/2"} Vertel ons iets meer`)}
        {this.renderSubHeading(
          "Probeer het formulier zo compleet mogelijk in te vullen, zodat wij u zo snel mogelijk kunnen helpen!",
          "🎉"
        )}
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

export default Marketing
