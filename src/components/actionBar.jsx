import React, { Component } from "react"
import ActionStep from "./actionStep"
import ActionButtons from "./common/actionButtons"
import "./styles/forms/form.css"
import Administratie from "./administratie"
import CopyWriting from "./copywriting"
import Website from "./website"
import Marketing from "./marketing"

class ActionBar extends Component {
  templates = {
    administration: () => (
      <Administratie selectedAction={this.props.selectedAction} />
    ),
    copywriting: () => (
      <CopyWriting selectedAction={this.props.selectedAction} />
    ),
    website: () => <Website selectedAction={this.props.selectedAction} />,
    marketing: () => <Marketing selectedAction={this.props.selectedAction} />,
  }

  getTemplate() {
    return this.templates[this.props.selectedAction.name]()
  }

  render() {
    const {
      active,
      selectedAction,
      onActionBarClick,
      step,
      ...rest
    } = this.props

    return (
      <div
        onClick={onActionBarClick}
        className={active ? "actionBar active" : "actionBar"}
        role="Selecteer dienst"
      >
        {!active ? (
          <ActionStep heading="Direct actie">
            <ActionButtons {...rest} type="withArrow" />
          </ActionStep>
        ) : null}
        {active && step === 1 ? (
          <ActionStep
            heading="Waarmee kan ik je helpen?"
            subHeading="Ontdek snel hoe ik je kan helpen door op een dienst te klikken "
            symbol="✨"
          >
            <ActionButtons {...rest} type="full" />
          </ActionStep>
        ) : null}
        {active && selectedAction ? this.getTemplate() : null}
        {/* {active && step === 2 ? (
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
        ) : null} */}
      </div>
    )
  }
}

export default ActionBar
