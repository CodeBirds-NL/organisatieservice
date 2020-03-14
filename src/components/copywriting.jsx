import React from "react"
import ActionStep from "./actionStep"
import Form from "./common/form"
import TextInput from "./common/textInput"

const CopyWriting = ({ selectedAction }) => {
  return (
    <ActionStep
      heading="1/2 Vertel ons iets meer"
      subHeading="Probeer het formulier zo compleet mogelijk in te vullen, zodat wij u zo snel mogelijk kunnen helpen!"
      symbol="🎉"
    >
      <Form action={selectedAction}>
        <TextInput
          name="textCategory"
          label="Soort tekst (web, folder, etc.)"
        />
        <TextInput name="subject" label="Onderwerp" />
        <TextInput name="textLength" label="Aantal woorden" />
      </Form>
    </ActionStep>
  )
}

export default CopyWriting
