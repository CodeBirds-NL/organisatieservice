import React, { useState } from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import "../components/styles/templates/portfolio.scss"
import "../components/styles/pages/fotografie.scss"
import Arrow from "../components/common/arrow"
import Hero from "../components/common/hero"
import TopWave from "../components/common/topWave"
import { Link, graphql } from "gatsby"
import SEO from "../components/seo"
import Lightbox from "../components/lightbox"

export default ({ pageContext, data }) => {
  const [showLightbox, setShowLightbox] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const { service, fotografie = null } = data.wordpressPage.acf

  /* START fotografie-specific code */
  let slider = false
  // imgs should be of the form [[1,2,3,4,5], [1,2,3,4,5], ...]
  const imgs = []
  if (pageContext.slug === "fotografie") {
    slider = true

    // Divide in chunks of 5
    let chunk = []
    fotografie.photos.forEach((photo, index) => {
      chunk.push(photo)
      // Every 5th time, add chunk to imgs and reset chunk array
      if ((index + 1) % 4 === 0) {
        imgs.push([...chunk])
        chunk = []
      }
    })
  }

  const handleOpen = i => {
    setShowLightbox(true)
    setSelectedImage(i)
  }
  const handleClose = () => {
    setShowLightbox(false)
    setSelectedImage(null)
  }
  const handlePrevRequest = (i, length) => e => {
    setSelectedImage((i - 1 + length) % length)
  }
  const handleNextRequest = (i, length) => e => {
    setSelectedImage((i + 1) % length)
  }
  /* END fotografie-specific code */

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
        {slider && (
          <section id="fotos">
            <div className="container">
              <div className="inner">
                <h2 className="subHeading">Voorbeelden</h2>
                <div className="gallery">
                  {imgs.map((row, r_index) => (
                    <div
                      key={"row" + r_index.toString()}
                      className={r_index % 2 === 1 ? "row alternate" : "row"}
                    >
                      {row.map((i, p_index) => (
                        <div
                          key={"item" + p_index.toString()}
                          onClick={() => handleOpen(p_index + r_index * 4)}
                          className="item"
                        >
                          <Img
                            className="img"
                            fluid={i.localFile.childImageSharp.fluid}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {typeof window !== "undefined" &&
                  window.innerWidth >= 600 &&
                  showLightbox &&
                  selectedImage !== null && (
                    <Lightbox
                      images={fotografie.photos}
                      handleClose={handleClose}
                      handleNextRequest={handleNextRequest}
                      handlePrevRequest={handlePrevRequest}
                      selectedImage={selectedImage}
                    />
                  )}
              </div>
            </div>
          </section>
        )}
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
        fotografie {
          photos {
            ...heroImageFragment
          }
        }
      }
    }
  }
`
