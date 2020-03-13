import React, { Component } from "react"
import Arrow from "./common/arrow"
import Emoji from "./common/emoji"

class ActionBar extends Component {
  render() {
    const {
      active,
      actionSelected,
      onActionSelect,
      onActionBarClick,
      actions,
    } = this.props
    return (
      <div
        onClick={onActionBarClick}
        className={active ? "actionBar active" : "actionBar"}
        role="Selecteer dienst"
      >
        <div className="heading">
          {active ? "Waarmee kan ik je helpen?" : "Direct actie"}
        </div>
        {active ? (
          <div className="subHeading">
            Ontdek snel hoe ik je kan helpen door op een dienst te klikken{" "}
            <Emoji symbol="✨" />
          </div>
        ) : null}
        <div className="actions">
          {actions.map(action => (
            <button
              key={action.name}
              onClick={_ => onActionSelect(action)}
              className={active ? "btn full" : "btn withArrow"}
            >
              {action.name} {active ? null : <Arrow width="24px" />}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

export default ActionBar
