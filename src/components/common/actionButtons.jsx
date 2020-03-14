import React from "react"
import Arrow from "./arrow"

const ActionButtons = ({ actions, onActionSelect, type }) => {
  return (
    <React.Fragment>
      {actions.map(action => (
        <button
          key={action.id}
          onClick={_ => onActionSelect(action.id)}
          className={`btn ${type}`}
        >
          {action.label} {type === "withArrow" ? <Arrow width="24px" /> : null}
        </button>
      ))}
    </React.Fragment>
  )
}

export default ActionButtons
