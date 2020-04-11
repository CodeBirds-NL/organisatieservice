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
    actionBarClicked: false,
    action: null,
    nextStep: null,
    scrollY: 0,
    submitted: false,
  }

  componentDidMount() {
    if (!this.props.action) return

    const action = this.actions.find(({ name }) => name === this.props.action)
    this.history = [...this.history, { ...this.state }]
    const scrollY = window.pageYOffset
    this.setState({ action, actionBarClicked: true, scrollY })
    document.body.style.position = "fixed"
  }

  componentWillUnmount() {
    document.body.style.position = "unset"
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
      name: "tekstschrijven",
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
        onSuccessfulSubmit={this.handleSuccessfulSubmit}
        submitted={this.state.submitted}
      />
    ),
    tekstschrijven: () => (
      <CopyWriting
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
        onSuccessfulSubmit={this.handleSuccessfulSubmit}
        submitted={this.state.submitted}
      />
    ),
    website: () => (
      <Website
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
        onSuccessfulSubmit={this.handleSuccessfulSubmit}
        submitted={this.state.submitted}
      />
    ),
    marketing: () => (
      <Marketing
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
        onSuccessfulSubmit={this.handleSuccessfulSubmit}
        submitted={this.state.submitted}
      />
    ),
    contact: () => (
      <DirectContact
        onNextStep={this.handleNextStep}
        data={this.state.action}
        nextStep={this.state.nextStep}
        onCustomBackClick={
          this.props.src === "contact" ? this.handleBackClick : null
        }
        onSuccessfulSubmit={this.handleSuccessfulSubmit}
        submitted={this.state.submitted}
      />
    ),
  }

  history = []

  handleActionBarClick = () => {
    if (this.state.actionBarClicked) return

    this.history = [...this.history, { ...this.state }]
    // store scroll position since position fixed on body reset scroll position
    const scrollY = window.pageYOffset
    this.setState(() => ({
      actionBarClicked: true,
      scrollY,
    }))

    document.body.style.position = "fixed"
  }

  handleBackClick = () => {
    // unmountMe is a callback passed from the parent that applies to diensten page
    const { unmountMe = "" } = this.props

    const { ...rest } = this.history[this.history.length - 1]
    this.setState({ ...rest })
    this.history.pop(this.history.length - 1)

    // if actionbar is clicked back to initial state, unset body position
    if (this.history.length < 1) {
      document.body.style.position = "unset"

      // this will make the document scroll to the original position when the actionbar modal opened
      window.scrollTo(0, this.state.scrollY)
      if (unmountMe) {
        //this method calls an unmount callback from the parent passed via props
        unmountMe()
      }
    }
  }

  handleActionButtonClick = (action, e) => {
    e.stopPropagation()

    this.history = [...this.history, { ...this.state }]
    const { actionBarClicked, scrollY } = this.state

    // check if click comes from modal or from sidebar
    if (actionBarClicked) return this.setState({ action })
    else {
      const scrollPosition = window.pageYOffset
      this.setState({ actionBarClicked: true, action, scrollY: scrollPosition })
    }

    document.body.style.position = "fixed"
  }

  handleNextStep = contactOption => {
    if (!contactOption) return

    this.history = [...this.history, { ...this.state }]
    this.setState({ nextStep: true })
  }

  handleSuccessfulSubmit = _ => {
    this.setState({ submitted: true })
  }

  handleClosing = _ => {
    const { unmountMe = "" } = this.props
    // set state to first history item and then clear history array
    this.setState({ ...this.history[0] })
    this.history.length = 0
    document.body.style.position = "unset"

    // this will make the document scroll to the original position when the actionbar modal opened
    window.scrollTo(0, this.state.scrollY)
    //this method calls an unmount callback from the parent passed via props
    if (unmountMe) {
      unmountMe()
    }
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
    const { actionBarClicked: active, action, submitted } = this.state
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
              submitted,
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
        <div className="buttonGroup">
          <ToggleButton
            handleToggle={this.handleActionBarClick}
            label={acf.hero_call_to_action}
          />
          <a href="#services" className="btn underline">
            Bekijk diensten
          </a>
        </div>
      </Hero>
    ) : src === "contact" ? (
      <ActionBar
        data={{
          active,
          action,
          src,
          submitted,
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
          submitted,
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
      submitted,
      handleBackClick,
      handleClosing,
      renderActionTemplate,
    } = this.props.data

    return (
      <div
        onClick={handleActionBarClick}
        // onClick={handleActionBarClick}
        className={active ? "actionBar active" : "actionBar"}
        role="Actie"
      >
        {active && (
          <span className="brand rotated">
            Organisatie<span className="bold">service</span>
          </span>
        )}
        <div className="backArea">
          {/* render back button only when we're not on the contactpage and when the form isn't submitted yet */}
          {src !== "contact" && !submitted ? (
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

/* TODOS:
- Optimize diensten pagina actionbar activation and deactivation
  Right now, the parent (Diensten) calls on btn click the actionbar Component 
  which gets rendered with the specified action selected. However, when
  the modal is closed, a callback (passed as prop) from parent is used to unmounts
  the actionBar by changing the state (selectedAction) on parent.
- Clean up render code for homepage, possibly using portals for the cta activating the modal
- Extract methods and clean up file to max 100 lines
*/
