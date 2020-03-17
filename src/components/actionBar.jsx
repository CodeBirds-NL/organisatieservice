import React, { Component } from "react"
import ActionStep from "./actionStep"
import ActionButtons from "./common/actionButtons"
import "./styles/forms/form.scss"
import Administratie from "./administratie"
import CopyWriting from "./copywriting"
import Website from "./website"
import Marketing from "./marketing"

class ActionBar extends Component {
  state = {
    actionBarClicked: false,
    action: null,
    step: null,
  }

  actions = [
    {
      id: 1,
      name: "administratie",
      label: "Administratie",
      options: [
        "Terugbelverzoek",
        "Afspraak op locatie",
        "Mening/advies",
        "Aanbieding",
      ],
    },
    {
      id: 2,
      name: "copywriting",
      label: "Tekst schrijven",
      options: ["Aanbieding", "Opdracht"],
    },
    {
      id: 3,
      name: "website",
      label: "Website",
      options: [
        "Terugbelverzoek",
        "Afspraak op locatie",
        "Mening/advies",
        "Aanbieding",
        "Designvoorstel",
      ],
    },
    {
      id: 4,
      name: "marketing",
      label: "Marketing",
      options: [
        "Terugbelverzoek",
        "Afspraak op locatie",
        "Mening/advies",
        "Aanbieding",
      ],
    },
    { id: 5, name: "contact", label: "Direct contact" },
  ]

  templates = {
    administratie: () => <Administratie data={this.state.action} />,
    copywriting: () => <CopyWriting data={this.state.action} />,
    website: () => <Website data={this.state.action} />,
    marketing: () => <Marketing data={this.state.action} />,
  }

  renderActionTemplate() {
    return this.templates[this.state.action.name]()
  }

  handleActionBarClick = () => {
    this.setState(() => ({ actionBarClicked: true }))
  }

  handleActionButtonClick = action => {
    this.setState(() => ({ action, step: 1 }))
  }

  renderSideBarView = () => {
    return (
      <ActionStep heading="Direct actie">
        <ActionButtons
          onActionButtonClick={this.handleActionButtonClick}
          actions={this.actions}
          type="withArrow"
        />
      </ActionStep>
    )
  }
  renderExpandedView = () => {
    return (
      <ActionStep
        heading="Waarmee kan ik je helpen?"
        subHeading="Ontdek snel hoe ik je kan helpen door op een dienst te klikken "
        symbol="✨"
      >
        <ActionButtons
          onActionButtonClick={this.handleActionButtonClick}
          actions={this.actions}
          type="full"
        />
      </ActionStep>
    )
  }

  render() {
    const { actionBarClicked: active, action, step } = this.state

    return (
      <div
        onClick={this.handleActionBarClick}
        className={active ? "actionBar active" : "actionBar"}
        role="Selecteer dienst"
      >
        {active
          ? action
            ? this.renderActionTemplate()
            : this.renderExpandedView()
          : this.renderSideBarView()}
      </div>
    )
  }
}

export default ActionBar
