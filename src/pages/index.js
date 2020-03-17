import React, { Component } from "react"
import { graphql } from "gatsby"
import Button from "../components/common/button"
import ActionBar from "../components/actionBar"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/styles/pages/homePage.scss"

class HomePage extends Component {
  render() {
    const { title, acf: data } = this.props.data.allWordpressPage.edges[0].node
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
          <ActionBar />
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
