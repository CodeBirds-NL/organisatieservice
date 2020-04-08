import React from "react"
import ProgressCircle from "./ProgressCircle"

const SuccessMessage = ({ name }) => {
  return (
    <div className="formWrapper submittedScreen">
      <div className="heading">{`Hartelijk bedankt ${name}!`}</div>
      <div className="subHeading">
        Ik kom hier zo snel mogelijk op terug! Voor nu neem een stapje terug en
        relax.
      </div>
      <div className="animation">
        <ProgressCircle />
        <div className="checkmark">
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage
