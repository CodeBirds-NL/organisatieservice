import React from "react"
import ActionStep from "./actionStep"
import Form from "./common/form"
import TextInput from "./common/textInput"

const Website = ({ selectedAction }) => {
  return (
    <ActionStep
      heading="1/2 Vertel ons iets meer over je website"
      subHeading="Probeer het formulier zo compleet mogelijk in te vullen, zodat wij u zo snel mogelijk kunnen helpen!"
      symbol="🎉"
    >
      <Form action={selectedAction}>
        <TextInput name="websiteName" label="Hoe moet ik je website noemen?" />
        <TextInput name="websitePurpose" label="Doel website" />
      </Form>
    </ActionStep>
  )
}

export default Website
