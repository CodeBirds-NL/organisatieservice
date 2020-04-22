import React from "react"

const ActionStep = ({ heading, subHeading, children, active }) => {
  return (
    <div className={active ? "actionStep active" : "actionStep"}>
      <div className="heading">{heading}</div>
      {subHeading ? <div className="subHeading">{subHeading}</div> : null}
      <div className="actions">{children}</div>
    </div>
  )
}

export default ActionStep
