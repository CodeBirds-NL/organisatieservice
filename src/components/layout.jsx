import React, { Component } from "react"
import Header from "./header/header"
// import Footer from "./footer"
import "./styles/layout/normalize.css"
import "./styles/layout/reset.css"
import "./styles/layout/layout.scss"

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Header headerColor={this.props.headerColor} />
        <div className="contentWrapper">{this.props.children}</div>
        {/* <Footer /> */}
      </React.Fragment>
    )
  }
}

export default Layout
