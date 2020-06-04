import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/common/hero"
import ActionBarParent from "../components/actionBar"
import Arrow from "../components/common/arrow"
import TopWave from "../components/common/topWave"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Pagina bestaat niet" />
    <Hero blobContent={<ActionBarParent src="404" />}>
      <h1 className="title">Pagina niet gevonden</h1>
      <p className="text">
        Helaas bestaat de pagina die u zoekt niet. Neem contact met ons op als u
        iets mist op de website of ga terug naar de homepage.
      </p>
      <Link to="/" className="btn underline withArrow">
        Ga terug <Arrow width="18px" color="#001010" />
      </Link>
    </Hero>
    <TopWave />
  </Layout>
)

export default NotFoundPage
