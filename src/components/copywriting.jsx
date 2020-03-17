import React from "react"
import Form from "./common/form"

class CopyWriting extends Form {
  state = {
    data: {
      textCategory: "",
      textSubject: "",
      textLength: "",
      contactOption: "",
    },
  }

  inputs = [
    { name: "textCategory", label: "Soort tekst (web, folder, etc.)" },
    { name: "textSubject", label: "Onderwerp" },
    { name: "textLength", label: "Aantal woorden" },
  ]

  render() {
    const { id, options } = this.props.data

    return (
      <div data-actionid={id}>
        {this.renderHeading("1/2 Vertel ons iets meer")}
        {this.renderSubHeading(
          "Probeer het formulier zo compleet mogelijk in te vullen, zodat wij een killer tekst kunnen schrijven!",
          "🎉"
        )}
        {this.renderForm(
          "Details",
          this.inputs,
          this.renderRadioOptions(options, "contactOption", "Contact Opties"),
          this.renderButton("full", "Volgende")
        )}
      </div>
    )
  }
}

export default CopyWriting
