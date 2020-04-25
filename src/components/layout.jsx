import React from "react"
import Header from "./header/header"
import Footer from "./footer"
import "./styles/layout/normalize.css"
import "./styles/layout/reset.css"
import "./styles/layout/layout.scss"

const Layout = props => {
  return (
    <React.Fragment>
      <Header headerColor={props.headerColor} />
      <div className="contentWrapper">{props.children}</div>
      <Footer />
    </React.Fragment>
  )
}

export default Layout
