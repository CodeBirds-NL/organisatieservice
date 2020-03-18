import React from "react"
import Form from "./common/form"

class Administratie extends Form {
  state = {
    data: {
      question: "",
      summary: "",
      contactOption: "",
    },
    nextStep: false,
  }

  inputs = [
    { name: "question", label: "Vraag/probleem" },
    { type: "textarea", name: "summary", label: "Omschrijf nader..." },
  ]

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

  render() {
    const { id, options } = this.props.data
    const { nextStep } = this.state

    return (
      <div data-actionid={id}>
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
        {/* <div className="contactData">
          {this.renderForm(
            "Uw contactgegevens",
            Object.values(this.contactInputs),
            null,
            this.renderButton("full", "Verstuur")
          )}
        </div> */}
      </div>
    )
  }
}

export default Administratie
