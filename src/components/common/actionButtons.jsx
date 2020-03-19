import React from "react"
import Arrow from "./arrow"

const ActionButtons = ({ actions, onActionButtonClick, type }) => {
  return (
    <div className="actionButtons">
      {actions.map(action => (
        <button
          key={action.id}
          onClick={e => onActionButtonClick(e, action)}
          className={`btn ${type}`}
        >
          {action.label} {type === "withArrow" ? <Arrow width="24px" /> : null}
        </button>
      ))}
    </div>
  )
}

export default ActionButtons
