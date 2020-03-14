import React from "react"
import ActionStep from "./actionStep"
import Form from "./common/form"
import Options from "./common/options"

const Marketing = ({ selectedAction }) => {
  return (
    <ActionStep
      heading="1/2 Vertel ons iets meer"
      subHeading="Probeer het formulier zo compleet mogelijk in te vullen, zodat wij u zo snel mogelijk kunnen helpen!"
      symbol="🎉"
    >
      <Form action={selectedAction}>
        <Options
          heading="Gewenst marketingkanaal"
          name="marketingCanal"
          options={[
            "brochure",
            "advertentie",
            "sociale media",
            "online marketing",
          ]}
        />
      </Form>
    </ActionStep>
  )
}

export default Marketing
