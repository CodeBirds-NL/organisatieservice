import React from "react"
import Details from "./details"
import Options from "./options"
import Button from "./button"

const Form = ({ children, action }) => {
  return (
    <form>
      <Details heading="Details">{children}</Details>
      <Options
        heading="Contact opties"
        name="contactOptions"
        options={action.options}
      />
      <div className="submit right">
        <Button type="full" label="Volgende" />
      </div>
    </form>
  )
}

export default Form
