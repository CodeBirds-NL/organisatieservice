import React, { Component } from "react"
import { graphql } from "gatsby"
import Button from "../components/common/button"
import ActionBar from "../components/actionBar"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/styles/pages/homePage.css"

class HomePage extends Component {
  state = {
    actionBarClicked: false,
    action: null,
  }

  actions = [
    { name: "Administratie" },
    { name: "Copywriting" },
    { name: "Websites" },
    { name: "Marketing" },
  ]

  handleActionBarClick = () => {
    this.setState(() => {
      return { actionBarClicked: true }
    })
    // increase width action bar -> slide to left
    // change state to actionSelected = true
    // when state is selected render method should render a different hero section
  }

  handleActionSelect = action => {
    this.setState(() => ({ action }))
  }

  render() {
    const { title, acf: data } = this.props.data.allWordpressPage.edges[0].node
    const { actionBarClicked: active, action } = this.state
    return (
      <Layout>
        <SEO title={title} />
        <section className="hero">
          <div className="container wrapper">
            <h1 className="title">{data.hero_title}</h1>
            <h2 className="subTitle">{data.hero_subtitle}</h2>
            <p className="text">{data.hero_text}</p>
            <Button
              type="ghostery"
              label={data.hero_call_to_action}
              color="gray"
            />
          </div>
          <ActionBar
            actions={this.actions}
            selectedAction={action}
            active={active}
            onActionBarClick={this.handleActionBarClick}
            onActionSelect={this.handleActionSelect}
          />
        </section>
      </Layout>
    )
  }
}

export default HomePage

export const query = graphql`
  query HomePageQuery {
    allWordpressPage(filter: { slug: { eq: "home" } }) {
      edges {
        node {
          acf {
            hero_call_to_action
            hero_subtitle
            hero_text
            hero_title
          }
          title
        }
      }
    }
  }
`
