import React, { Component } from "react"
import Layout from "../components/layout"
import ActionBarParent from "../components/actionBar"

import "./contact.scss"

class ContactPage extends Component {
  render() {
    return (
      <Layout>
        <div id="contact">
          <span className="brand rotated">Organisatieservice</span>
          <ActionBarParent action="contact" src="contact" />
        </div>
      </Layout>
    )
  }
}

export default ContactPage
