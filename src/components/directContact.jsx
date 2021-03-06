import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import axios from "axios"
import "./styles/forms/form.scss"
import ProgressCircle from "./common/ProgressCircle"

class DirectContact extends Component {
  defaultState = {
    uploadPercentage: null,
    dragEnter: false,
    files: [],
    name: "",
    project: "",
    feedback_msg: "",
  }

  state = {
    uploadPercentage: null,
    dragEnter: false,
    files: [],
    name: "",
    project: "",
    feedback_msg: "",
  }

  contactOptions = {
    tel2: "Bellen",
    email: "Email",
    whatsapp_link: "WhatsApp",
  }

  handleUpload = async (e, method) => {
    e.preventDefault()

    let files = e.target.files || e.dataTransfer.files
    // update state
    this.setState({
      files: [...this.state.files, ...files],
      dragEnter: false,
    })
  }

  handleDragEnter = () => {
    this.setState({ dragEnter: true })
  }

  handleDragLeave = () => {
    this.setState({ dragEnter: false })
  }

  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  handleSubmit = async e => {
    e.preventDefault()

    const { name, project, files } = this.state
    const api = "https://organisatieservice.codebirds-apiserver.nl"

    if (files.length < 1)
      return this.setState({ feedback_msg: "*Selecteer 1 of meer bestanden." })
    if (!name)
      return this.setState({
        feedback_msg: "*Oeps! Naam/bedrijfsnaam invullen is verplicht.",
      })

    // check if file upload size doesn't exceed maximum
    let bytes = 0
    files.forEach(f => (bytes += f.size))

    if (bytes > 512000000)
      // show error message here
      return this.setState({
        feedback_msg:
          "*Oeps! De uploadgrootte van je bestanden is groter dan 512 MB",
      })

    const strip = str => {
      // this regex selects all illegal characters
      let regex0 = RegExp(
        /\/|\\|\||\.|\,|\*|'|"|~|#|`|;|\?|<|>|{|}|\[|\]|:/,
        "g"
      )
      // this regex selects space and dashes
      let regex1 = RegExp(/ |-/, "g")
      str = str
        .trim()
        .replace(regex0, "")
        .replace(regex1, "_")
      return str
    }

    const formData = new FormData()
    //append name
    formData.append("name", strip(name))
    formData.append("project", strip(project))
    // append files
    for (let file of files) {
      formData.append("images", file)
    }

    try {
      const res = await axios.post(`${api}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: progressEvent => {
          this.setState({
            uploadPercentage: parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            ),
          })

          // remove backbutton
          this.props.inheritedProps.onSuccessfulSubmit()
        },
      })
      const data = res.data
      if (data !== "success") return
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { uploadPercentage, dragEnter, files, feedback_msg } = this.state

    const {
      data,
      nextStep,
      onNextStep,
      onCustomBackClick = "",
    } = this.props.inheritedProps

    const {
      tel2,
      email,
      whatsapp_link,
    } = this.props.wpData.allWordpressPage.edges[0].node.acf.contactgegevens

    const { title, text } = this.props.inheritedProps.queryData

    return (
      <div className="contactPageWrapper">
        <div className="formWrapper">
          <div
            data-actionid={data.id}
            className={
              nextStep ? "contact actionData" : "show contact actionData"
            }
          >
            <div className="heading">{title}</div>
            <div className="subHeading">{text}</div>
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
              <button
                onClick={() => onNextStep("upload foto's")}
                className="btn full"
              >
                Upload foto's
              </button>
            </div>
          </div>
          <div
            className={
              nextStep ? "show upload contactData" : "upload contactData"
            }
          >
            <div className="heading">Upload je foto's</div>
            <div className="subHeading">
              Je kunt hier meerdere foto's/bestanden uploaden zonder
              kwaliteitsverlies. Let op: de maximale upload grootte bedraagt{" "}
              <u>512MB</u>
            </div>
            {uploadPercentage > 0 ? (
              <div className="animation">
                <ProgressCircle percentage={uploadPercentage} />
                <div className="chartInfo">
                  <span className={uploadPercentage == 100 ? "success" : null}>
                    {uploadPercentage}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="uploadWrapper">
                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Naam/bedrijfsnaam"
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="project"
                      placeholder="Project"
                      onChange={e => this.setState({ project: e.target.value })}
                    />
                  </div>
                  <div
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDragOverCapture={e => e.preventDefault()}
                    onDrop={e => this.handleUpload(e, "drop")}
                    className="area"
                  >
                    <div className="form-group">
                      <input
                        type="file"
                        name="images"
                        id="images"
                        multiple
                        className="fileInput"
                        onChange={e => this.handleUpload(e, "click")}
                      />
                      <label
                        className={dragEnter ? "enter" : ""}
                        htmlFor="images"
                      >
                        <div className="icon"></div>
                        <div className="text">
                          {files
                            ? files.length + " bestanden geselecteerd"
                            : "Klik of sleep je files op dit veld"}
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="feedback_msg">
                    <p className="content">{feedback_msg}</p>
                  </div>
                  <div className="buttonGroup" style={{ marginBottom: 30 }}>
                    <input
                      onClick={e => this.handleSubmit(e)}
                      className="btn full"
                      type="submit"
                      value="Upload"
                    />
                    {/* render go back button only on contactpage */}
                    {onCustomBackClick && (
                      <button
                        onClick={e => onCustomBackClick(e)}
                        className="btn underline white"
                      >
                        Ga terug
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
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
    render={data => <DirectContact inheritedProps={props} wpData={data} />}
  />
)
