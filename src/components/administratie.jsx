import React from "react"
import ActionStep from "./actionStep"
import Form from "./common/form"
import TextInput from "./common/textInput"
import TextAreaInput from "./common/textAreaInput"

const Administratie = ({ selectedAction }) => {
  return (
    <ActionStep
      heading="1/2 Vertel ons iets meer"
      subHeading="Probeer het formulier zo compleet mogelijk in te vullen, zodat wij u zo snel mogelijk kunnen helpen!"
      symbol="🎉"
    >
      <Form action={selectedAction}>
        <TextInput name="question" label="Uw vraag/probleem..." />
        <TextAreaInput
          name="summary"
          label="Wat is uw eigen idee hoe ik u zou kunnen helpen?"
        />
      </Form>
    </ActionStep>
  )
}

export default Administratie
