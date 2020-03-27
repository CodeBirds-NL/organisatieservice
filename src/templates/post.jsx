import React from "react"
import Layout from "../components/layout"
import "../components/styles/templates/portfolio.scss"
import Arrow from "../components/common/arrow"
import Hero from "../components/common/hero"

function renderSteps() {
  renderSteps = () => {
    // select each li and map it to an array with class + span with index
  }
}

export default ({ pageContext }) => {
  const { title, acf } = pageContext

  return (
    <Layout headerColor="#f8f8f8">
      <Hero
        background="#f8f8f8"
        image={
          <img
            className="clientLogo"
            src={acf.logo_klant.source_url}
            alt={acf.logo_klant.alt_text}
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
        <h1 className="title post">{acf.titel}</h1>
        <p className="text">{acf.vraag}</p>
      </Hero>
      <div className="body">
        <div id="aanpak">
          <div className="container">
            <h2 className="subHeading">Aanpak</h2>
            <div className="col-1">
              <p className="text">{acf.aanpak}</p>
              <a href="#resultaat" className="btn underline withArrow">
                <span className="content">Resultaat</span>{" "}
                <Arrow width="18px" color="#001010" />
              </a>
            </div>
            <div className="col-2">
              <div className="steps">
                <ul>
                  {acf.steps.map((item, index) => (
                    <li key={index} className="step">
                      <span>{index + 1}</span>
                      {item.stap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="resultaat">
          <div className="container">
            <div className="inner">
              <div className="col-1">
                <h2 className="subHeading">Resultaat</h2>
                <p className="text">{acf.resultaat}</p>
              </div>
              <div className="col-2">
                <img
                  src={acf.project_foto.source_url}
                  alt="project resultaat"
                />
              </div>
              <a href={acf.link_website} className="btn underline withArrow">
                <span className="content">Bekijk live resultaat</span>{" "}
                <Arrow width="18px" color="#001010" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
