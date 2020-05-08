import React, { Component } from "react"
import Hero from "../components/common/hero"
import Layout from "../components/layout"
import { StaticQuery, Link, graphql } from "gatsby"
import ActionBarParent from "../components/actionBar"
import "../components/styles/pages/diensten.scss"
import Arrow from "../components/common/arrow"
import TopWave from "../components/common/topWave"

class Diensten extends Component {
  state = {
    selectedAction: null,
  }

  handleDienstCTA = action => {
    const { selectedAction } = this.state
    if (selectedAction !== action) this.setState({ selectedAction: action })
    // render actionbar with specified action prop
  }

  handleActionBarUnmount() {
    this.setState({ selectedAction: null })
  }

  renderService = (data, index) => {
    return (
      <div
        key={index}
        id={data.title
          .toLowerCase()
          .split(" ")
          .join("")}
        className="service"
      >
        <div className="col-1">
          <h2 className="subHeading">{data.title}</h2>
          <p className="text">{data.text}</p>
          <button
            onClick={() =>
              this.handleDienstCTA(
                data.title
                  .toLowerCase()
                  .split(" ")
                  .join("")
              )
            }
            className="btn ghostery gray"
          >
            {data.cta}
          </button>
        </div>
        <div className="col-2">
          <img src={data.image.source_url} alt={data.image.alt_text} />
        </div>
      </div>
    )
  }

  render() {
    const {
      title,
      text,
      image,
      cta,
      references_title,
      services,
    } = this.props.data.acf.services_page
    const { logos } = this.props
    const { selectedAction } = this.state

    return (
      <Layout>
        {selectedAction ? (
          <ActionBarParent
            action={selectedAction}
            src="diensten"
            unmountMe={this.handleActionBarUnmount.bind(this)}
          />
        ) : null}
        <Hero
          image={
            <img
              className="dienstenImage"
              src={image.source_url}
              alt={image.alt_text}
            />
          }
          blobContent={
            <div className="servicesNavigation">
              <div className="heading">Ga snel naar</div>
              <div className="inner">
                {services.map(i => (
                  <a
                    key={i.title}
                    className="btn withArrow"
                    href={`#${i.title
                      .toLowerCase()
                      .split(" ")
                      .join("")}`}
                  >
                    {i.title}
                    <Arrow width="24px" color="white" />
                  </a>
                ))}
              </div>
            </div>
          }
        >
          <h1 className="title">{title}</h1>
          <p className="text">{text}</p>
          <a href="#services" className="btn underline withArrow">
            {cta} <Arrow width="18px" color="#001010" />
          </a>
        </Hero>
        <TopWave />
        <section id="services">
          <div className="container">
            <div className="upper">
              {services.map((i, index) => {
                if (index >= 2) return null
                return this.renderService(i, index)
              })}
            </div>
          </div>
          <div className="testimonials">
            <div className="container">
              <div className="inner">
                <h5>{references_title}</h5>
                <div className="gallery">
                  {logos.map(({ node: i }, index) => {
                    if (index < 4) {
                      return (
                        <div key={i.slug} className="logo">
                          <Link to={`/portfolio/${i.slug}`}>
                            <img
                              src={i.acf.logo_klant.source_url}
                              alt={i.acf.logo_klant.alt_text}
                            />
                          </Link>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="lower">
              {services.map((i, index) => {
                if (index < 2) return null
                return this.renderService(i, index)
              })}
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(filter: { slug: { eq: "diensten" } }) {
          edges {
            node {
              acf {
                services_page {
                  title
                  text
                  cta
                  image {
                    source_url
                    alt_text
                  }
                  references_title
                  services {
                    cta
                    text
                    title
                    image {
                      alt_text
                      source_url
                    }
                  }
                }
              }
            }
          }
        }
        allWordpressPost {
          edges {
            node {
              slug
              acf {
                logo_klant {
                  alt_text
                  source_url
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Diensten
        logos={data.allWordpressPost.edges}
        data={data.allWordpressPage.edges[0].node}
      />
    )}
  />
)
