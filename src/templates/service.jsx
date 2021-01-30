import React from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import "../components/styles/templates/portfolio.scss"
import Arrow from "../components/common/arrow"
import Hero from "../components/common/hero"
import TopWave from "../components/common/topWave"
import { Link } from "gatsby"
import SEO from "../components/seo"

export default ({ pageContext, data }) => {
  const { service } = data.wordpressPage.acf

  return (
    <Layout>
      <SEO title={service.titel} />
      <Hero
        background="#fff"
        image={
          <Img
            className="projectfoto"
            fluid={service.project_foto.localFile.childImageSharp.fluid}
            alt={service.project_foto.alt_text}
          />
        }
        buttonLabel="Lees meer"
        blobContent={
          <div
            className="highlights"
            dangerouslySetInnerHTML={{ __html: service.highlights }}
          ></div>
        }
      >
        <h1 className="title">{service.titel}</h1>
        <p className="text">{service.vraag}</p>
        <div className="buttonGroup">
          {service.hero_buttons.map(({ label, link }) => {
            return link.indexOf("#") > -1 ? (
              <a className="btn ghostery gray" href={link}>
                {label}
              </a>
            ) : (
              <Link to={link} className="btn ghostery right">
                {label}
              </Link>
            )
          })}
        </div>
      </Hero>
      <TopWave />
      <div className="body">
        <section
          id={service.aanpak_title
            .toLowerCase()
            .split(" ")
            .join("-")}
          className="aanpak"
        >
          <div className="container">
            <div className="inner">
              <div className="col-1">
                <h2 className="subHeading">{service.aanpak_title}</h2>
                <p className="text">{service.aanpak}</p>
              </div>
              <div className="col-2">
                <div className="steps">
                  <ul>
                    {service.steps.map((item, index) => (
                      <li key={index} className="step">
                        <span>{index + 1}</span>
                        <span>{item.stap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id={service.resultaat_title
            .toLowerCase()
            .split(" ")
            .join("-")}
          className="resultaat"
        >
          <div className="container">
            <div className="inner">
              <div className="col-1">
                <Img
                  fluid={service.result_image.localFile.childImageSharp.fluid}
                  alt={service.result_image.alt_text}
                />
              </div>
              <div className="col-2">
                <h2 className="subHeading">{service.resultaat_title}</h2>
                <p className="text">{service.resultaat}</p>
                <Link
                  to={service.result_link}
                  className="btn underline withArrow"
                >
                  <span className="content">{service.link_label}</span>{" "}
                  <Arrow width="18px" color="#001010" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

/**
 * Asynchronously gets page data based on wordpress_id (passed from gatsby-node.js)
 * @param {Number} $wordpress_id - Id of the page
 * @returns {Object} data in format we queried it
 */

export const data = graphql`
  query DienstSingleQuery($wordpress_id: Int) {
    wordpressPage(wordpress_id: { eq: $wordpress_id }) {
      acf {
        service {
          aanpak
          aanpak_title
          link_label
          resultaat
          resultaat_title
          result_link
          titel
          vraag
          hero_buttons {
            label
            link
          }
          project_foto {
            ...heroImageFragment
          }
          result_image {
            ...heroImageFragment
          }
          highlights
          steps {
            stap
          }
        }
      }
    }
  }
`
