import React from "react"
import Layout from "../components/layout"
import "../components/styles/templates/portfolio.scss"
import Arrow from "../components/common/arrow"
import Button from "../components/common/button"

export default ({ pageContext }) => {
  const { title, acf } = pageContext
  return (
    <Layout headerColor="#f8f8f8">
      <section id="portfolioSingle" className="hero intro">
        <div className="wrapper container">
          <div className="col-1">
            <h1 className="heading">{acf.titel}</h1>
            <p className="text">{acf.vraag}</p>
            <Button type="ghostery" label="Lees meer" color="gray" />
          </div>
          <div className="col-2"></div>
        </div>
        <div className="actionsBlob"></div>
        <div className="highlights">
          <div
            className="highlights"
            dangerouslySetInnerHTML={{ __html: acf.highlights }}
          ></div>
        </div>
      </section>
      <div className="body">
        <div className="container">
          <div id="aanpak">
            <h2 className="subHeading">Aanpak</h2>
            <div className="col1">
              <p className="text">{acf.aanpak}</p>
              <a href="#resultaat" className="btn underline withArrow">
                <span className="content">Resultaat</span>{" "}
                <Arrow width="18px" color="#001010" />
              </a>
            </div>
            <div className="col2">
              <div className="steps">
                <ul>
                  <li className="step">
                    <span>1</span>Projectbespreking
                  </li>
                  <li className="step">
                    <span>2</span>Prototype ontwerp
                  </li>
                  <li className="step">
                    <span>3</span>Feedback
                  </li>
                  <li className="step">
                    <span>4</span>Oplevering
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="resultaat">
            <div className="col1">
              <h2 className="subHeading">Resultaat</h2>
              <p className="text">{acf.resultaat}</p>
            </div>
            <div className="col2">
              <img src={acf.project_foto.source_url} alt="project resultaat" />
            </div>
            <a href={acf.link_website} className="btn underline withArrow">
              <span className="content">Bekijk live resultaat</span>{" "}
              <Arrow width="18px" color="#001010" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
