import React from "react"
import Emoji from "./common/emoji"

const ActionStep = ({ heading, subHeading, children, symbol, active }) => {
  return (
    <div className={active ? "actionStep active" : "actionStep"}>
      <div className="heading">{heading}</div>
      {subHeading ? (
        <div className="subHeading">
          {subHeading} {symbol ? <Emoji symbol={symbol} /> : null}
        </div>
      ) : null}
      <div className="actions">{children}</div>
    </div>
  )
}

export default ActionStep
