import React, { Component } from "react"
import ActionStep from "./actionStep"
import ActionButtons from "./common/actionButtons"
import "./styles/forms/form.scss"
import Administratie from "./administratie"
import CopyWriting from "./copywriting"
import Website from "./website"
import Marketing from "./marketing"
import DirectContact from "./directContact"
import Arrow from "./common/arrow"

class ActionBar extends Component {
  defaultState = {
    actionBarClicked: false,
    action: null,
    nextStep: null,
  }

  state = {
    actionBarClicked: false,
    action: null,
    nextStep: null,
  }

  componentWillMount() {
    if (this.props.src === "home") {
      this.setState({ actionBarClicked: false, action: null })
    } else {
      // the code that follows applies for the contact page that inializes the action bar straight to the contact level
      const { ...state } = this.state
      const arr = [...this.history]
      arr.push({ ...state })
      this.history = arr

      this.setState({
        actionBarClicked: true,
        action: this.actions[this.actions.length - 1],
      })
    }
  }

  componentDidUpdate() {
    if (JSON.stringify(this.state) === JSON.stringify(this.defaultState)) {
      this.props.onActive(false)
    }
  }

  actions = [
    {
      id: 1,
      name: "administratie",
      label: "Administratie",
      options: [
        "Opdracht",
        "Aanbieding",
        "Terugbelverzoek",
        "Afspraak op locatie",
        "Mening/advies",
      ],
    },
    {
      id: 4,
      name: "marketing",
      label: "Marketing",
      options: [
        "Opdracht",
        "Aanbieding",
        "Terugbelverzoek",
        "Afspraak op locatie",
        "Mening/advies",
      ],
    },
    {
      id: 3,
      name: "website",
      label: "Website",
      options: [
        "Opdracht",
        "Aanbieding",
        "Terugbelverzoek",
        "Afspraak op locatie",
        "Mening/advies",
      ],
    },
    {
      id: 2,
      name: "copywriting",
      label: "Tekst schrijven",
      options: ["Opdracht", "Aanbieding"],
    },

    { id: 5, name: "contact", label: "Direct contact" },
  ]

  templates = {
    administratie: () => (
      <Administratie
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
      />
    ),
    copywriting: () => (
      <CopyWriting
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
      />
    ),
    website: () => (
      <Website
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
      />
    ),
    marketing: () => (
      <Marketing
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
      />
    ),
    contact: () => <DirectContact data={this.state.action} />,
  }

  history = []

  handleActionBarClick = () => {
    if (this.state.actionBarClicked) return
    const arr = [...this.history]
    arr.push({ ...this.state })
    this.history = arr
    this.setState(() => ({ actionBarClicked: true }))

    this.props.onActive(true)
  }

  handleBackClick = () => {
    const { ...rest } = this.history[this.history.length - 1]
    this.setState({ ...rest })
    this.history.pop(this.history.length - 1)
  }

  handleActionButtonClick = (e, action) => {
    e.stopPropagation()

    const { ...state } = this.state
    const arr = [...this.history]
    arr.push({ ...state })
    this.history = arr
    this.setState(() => {
      return state.actionBarClicked
        ? { action }
        : { action, actionBarClicked: true }
    })
  }

  handleNextStep = contactOption => {
    if (!contactOption) return

    const arr = [...this.history]
    arr.push({ ...this.state })
    this.history = arr
    this.setState({ nextStep: true })
  }

  handleClosing = _ => {
    //set state to first history item and then clear history array
    const { ...firstState } = this.history[0]
    this.setState({ ...firstState })
    this.history.length = 0
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
        active={this.state.actionBarClicked}
      >
        <ActionButtons
          onActionButtonClick={this.handleActionButtonClick}
          actions={this.actions}
          type="full"
        />
      </ActionStep>
    )
  }

  renderActionTemplate() {
    return this.templates[this.state.action.name]()
  }

  render() {
    const { actionBarClicked: active, action } = this.state

    return (
      <div
        onClick={this.handleActionBarClick}
        className={active ? "actionBar active" : "actionBar"}
        role="Selecteer dienst"
      >
        {" "}
        <div className="backArea">
          {this.props.src === "home" ? (
            <button onClick={this.handleBackClick} className="btn back">
              <Arrow width="32px" />
            </button>
          ) : null}
        </div>
        <div className="viewArea">
          {this.props.src === "home" ? (
            <button
              onClick={this.handleClosing}
              className={active ? "btn form-close" : "btn form-close hide"}
            >
              Close
            </button>
          ) : null}
          {active
            ? action
              ? this.renderActionTemplate()
              : this.renderExpandedView()
            : this.renderSideBarView()}
        </div>
      </div>
    )
  }
}

export default ActionBar
