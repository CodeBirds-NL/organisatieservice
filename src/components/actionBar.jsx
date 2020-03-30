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
import Hero from "./common/hero"

class ActionBarParent extends Component {
  state = {
    actionBarClicked: this.props.active || false,
    action: null,
    nextStep: null,
  }

  componentDidMount() {
    // inialize actionbar dependent on src (the page it is loaded on)
    if (this.props.src !== "contact") {
      this.setState({ actionBarClicked: false, action: null })
    } else {
      // the code that follows applies for the contact page that inializes the action bar straight to the contact level
      // this.history = [...this.history, { ...this.state }]
      this.setState({
        actionBarClicked: true,
        action: this.actions[this.actions.length - 1],
      })
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

    this.history = [...this.history, { ...this.state }]
    this.setState(() => ({ actionBarClicked: true }))
  }

  handleBackClick = () => {
    const { ...rest } = this.history[this.history.length - 1]
    this.setState({ ...rest })
    this.history.pop(this.history.length - 1)
  }

  handleActionButtonClick = (e, action) => {
    e.stopPropagation()

    this.history = [...this.history, { ...this.state }]
    this.setState(() => {
      return this.state.actionBarClicked
        ? { action }
        : { action, actionBarClicked: true }
    })
  }

  handleNextStep = contactOption => {
    if (!contactOption) return

    this.history = [...this.history, { ...this.state }]
    this.setState({ nextStep: true })
  }

  handleClosing = _ => {
    // set state to first history item and then clear history array
    // const { ...firstState } = this.history[0]
    this.setState({ ...this.history[0] })
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
    const { src, acf } = this.props

    return src === "home" ? (
      <Hero
        minHeight="100%"
        image={
          <img
            className="homeHeroImage"
            src={acf.hero_image.source_url}
            alt={acf.hero_image.alt_text}
          />
        }
        blobContent={
          <ActionBar
            data={{
              active,
              action,
              actions: this.actions,
              handleActionBarClick: this.handleActionBarClick,
              src,
              handleBackClick: this.handleBackClick,
              handleClosing: this.handleClosing,
              handleActionButtonClick: this.handleActionButtonClick,
              renderActionTemplate: this.renderActionTemplate.bind(this),
            }}
          />
        }
      >
        <h1 className="title">{acf.hero_title}</h1>
        <h1 className="subTitle">{acf.hero_subtitle}</h1>
        <p className="text">{acf.hero_text}</p>
        <ToggleButton
          handleToggle={this.handleActionBarClick}
          label={acf.hero_call_to_action}
        />
        <a href="#services" className="btn underline ml-2">
          Bekijk diensten
        </a>
      </Hero>
    ) : src === "contact" ? (
      <ActionBar
        data={{
          active,
          action,
          src,
          renderActionTemplate: this.renderActionTemplate.bind(this),
        }}
      />
    ) : (
      <ActionBar
        data={{
          active,
          action,
          actions: this.actions,
          handleActionBarClick: this.handleActionBarClick,
          src,
          handleBackClick: this.handleBackClick,
          handleClosing: this.handleClosing,
          handleActionButtonClick: this.handleActionButtonClick,
          renderActionTemplate: this.renderActionTemplate.bind(this),
        }}
      />
    )
  }
}

export default ActionBarParent

class ActionBar extends Component {
  renderSideBarView = () => {
    const { actions, handleActionButtonClick, src } = this.props.data

    return src !== "contact" ? (
      <ActionStep heading="Direct actie">
        <ActionButtons
          onActionButtonClick={handleActionButtonClick}
          actions={actions}
          type="withArrow"
        />
      </ActionStep>
    ) : null
  }

  renderExpandedView = () => {
    const { active, actions, handleActionButtonClick, src } = this.props.data
    return src !== "contact" ? (
      <ActionStep
        heading="Waarmee kan ik je helpen?"
        subHeading="Ontdek snel hoe ik je kan helpen door op een dienst te klikken "
        symbol="✨"
        active={active}
      >
        <ActionButtons
          onActionButtonClick={handleActionButtonClick}
          actions={actions}
          type="full"
        />
      </ActionStep>
    ) : null
  }
  render() {
    const {
      active,
      action,
      handleActionBarClick,
      src,
      handleBackClick,
      handleClosing,
      renderActionTemplate,
    } = this.props.data

    return (
      <div
        onClick={handleActionBarClick}
        className={active ? "actionBar active" : "actionBar"}
        role="Actie"
      >
        {active && (
          <span className="brand rotated">
            Organisatie<span className="bold">service</span>
          </span>
        )}
        <div className="backArea">
          {src !== "contact" ? (
            <button onClick={handleBackClick} className="btn back">
              <Arrow width="32px" />
            </button>
          ) : null}
        </div>
        <div className="viewArea">
          {src !== "contact" ? (
            <button
              onClick={handleClosing}
              className={active ? "btn form-close" : "btn form-close hide"}
            >
              Close
            </button>
          ) : null}
          {active
            ? action
              ? renderActionTemplate()
              : this.renderExpandedView()
            : this.renderSideBarView()}
        </div>
      </div>
    )
  }
}

const ToggleButton = ({ label = "Click me", handleToggle }) => {
  return (
    <button onClick={handleToggle} className="btn ghostery gray">
      {label}
    </button>
  )
}
