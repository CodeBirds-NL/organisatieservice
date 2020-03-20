import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Emoji from "./common/emoji"

class DirectContact extends Component {
  contactOptions = {
    tel2: "Bellen",
    email: "Email",
    whatsapp_link: "WhatsApp",
  }

  render() {
    const { wpData, data } = this.props
    const {
      tel2,
      email,
      whatsapp_link,
    } = wpData.allWordpressPage.edges[0].node.acf.contactgegevens

    return (
      <div data-actionid={data.id} className="formWrapper contact">
        <div className="heading">Neem contact op</div>
        <div className="subHeading">
          Wij helpen u graag met uw probleem. Just hit one of the buttons for
          now! <Emoji symbol="😄" label="contact" />
        </div>
        <div className="actions">
          <a className="btn full" href={`tel:${tel2}`}>
            Bellen
          </a>
          <a className="btn full" href={whatsapp_link}>
            WhatsApp
          </a>
          <a className="btn full" href={`mailto:${email}`}>
            Email
          </a>
        </div>
      </div>
    )
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(filter: { slug: { eq: "header" } }) {
          edges {
            node {
              acf {
                contactgegevens {
                  tel2
                  whatsapp_link
                  email
                }
              }
            }
          }
        }
      }
    `}
    render={data => <DirectContact data={props.data} wpData={data} />}
  />
)

/* component interface 
  - receive data from staticquery (header.contactdetails)
  - 
*/
