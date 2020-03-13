import React, { Component } from "react"
import Arrow from "./common/arrow"
import Emoji from "./common/emoji"
import "./styles/forms/form.css"

class ActionBar extends Component {
  render() {
    const {
      active,
      selectedAction,
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
        {selectedAction ? (
          <div className="stage2">
            <form>
              <div className="details">
                <h3>Details</h3>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Uw vraag/probleem..."
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Wat is uw eigen idee hoe ik u zou kunnen helpen?"
                    rows="4"
                    id="summary"
                    name="summary"
                  />
                </div>
              </div>
              <div className="contactOptions">
                <h3>Contact opties</h3>
                <div className="form-group">
                  <ul>
                    <li>
                      <label>
                        <input
                          name="contactOptions"
                          value="Bel me"
                          type="radio"
                        />
                        Bel me
                      </label>
                    </li>
                    <li>
                      <label>
                        <input
                          name="contactOptions"
                          value="Afspraak op locatie"
                          type="radio"
                        />
                        Afspraak op locatie
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="submit right">
                <button className="btn full">Volgende</button>
              </div>
            </form>
          </div>
        ) : null}
      </div>
    )
  }
}

export default ActionBar
