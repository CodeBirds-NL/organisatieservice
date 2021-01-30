import React from "react"
import Img from "gatsby-image"
import Layout from "../components/layout"
import "../components/styles/templates/portfolio.scss"
import Arrow from "../components/common/arrow"
import Hero from "../components/common/hero"
import TopWave from "../components/common/topWave"
import { Link } from "gatsby"
import SEO from "../components/seo"

export default ({ pageContext }) => {
  const { acf, title } = pageContext

  return (
    <Layout>
      <SEO title={"Project " + title} />
      <Hero
        background="#fff"
        image={
          <Img
            className="projectfoto"
            fluid={acf.project_foto.localFile.childImageSharp.fluid}
            alt={acf.project_foto.alt_text}
          />
        }
        buttonLabel="Lees meer"
        blobContent={
          <div
            className="highlights"
            dangerouslySetInnerHTML={{ __html: acf.highlights }}
          ></div>
        }
      >
        <h1 className="title">{acf.titel}</h1>
        <p className="text">{acf.vraag}</p>
        <div className="buttonGroup">
          <a className="btn ghostery gray" href="#aanpak">
            Bekijk aanpak
          </a>
          <Link to="/portfolio" className="btn ghostery right">
            Alle projecten
          </Link>
        </div>
      </Hero>
      <TopWave />
      <div className="body">
        <section className="aanpak" id="aanpak">
          <div className="container">
            <div className="inner">
              <div className="col-1">
                <h2 className="subHeading">Aanpak</h2>
                <p className="text">{acf.aanpak}</p>
              </div>
              <div className="col-2">
                <div className="steps">
                  <ul>
                    {acf.steps.map((item, index) => (
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
        <section className="resultaat" id="resultaat">
          <div className="container">
            <div className="inner">
              <div className="col-1">
                <Img
                  fluid={acf.project_foto.localFile.childImageSharp.fluid}
                  alt={acf.project_foto.alt_text}
                />
              </div>
              <div className="col-2">
                <h2 className="subHeading">Resultaat</h2>
                <p className="text">{acf.resultaat}</p>
                <a href={acf.link_website} className="btn underline withArrow">
                  <span className="content">{acf.link_label}</span>{" "}
                  <Arrow width="18px" color="#001010" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
