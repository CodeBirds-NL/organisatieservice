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
  }

  state = {
    uploadPercentage: null,
    dragEnter: false,
    files: [],
    name: "",
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

  handleSubmit = async e => {
    e.preventDefault()

    const { name, files } = this.state
    // const api = "https://zecs44yyx7.execute-api.eu-central-1.amazonaws.com/prod"
    const api = "https://organisatieservice.codebirds-apiserver.nl"

    // if (!files) return console.error("Please select 1 or more files")

    // // 1. Now first zip all selected files
    // files.forEach(f => zip.file(f.name, f))
    // const blob = zip.generateAsync({ type: "arraybuffer" })

    // let formattedName = name
    //   .toLowerCase()
    //   .split(" ")
    //   .join("")

    // try {
    //   // 1. get upload url
    //   const res = await axios.post(`${api}/upload-url`, {
    //     Key: `${formattedName}.zip`,
    //     ContentType: "application/zip",
    //   })

    //   const { url: preSignedUrl } = await res.data

    //   // 2. upload files
    //   blob.then(body => {
    //     console.log(body)

    //     axios
    //       .put(
    //         preSignedUrl,
    //         { body },
    //         {
    //           onUploadProgress: progressEvent => {
    //             this.setState({
    //               uploadPercentage: parseInt(
    //                 Math.round(
    //                   (progressEvent.loaded * 100) / progressEvent.total
    //                 )
    //               ),
    //             })
    //           },
    //         }
    //       )
    //       .then(uploadFilesToDrive)
    //   })

    //   // 3. get object and send to google drive
    //   // const uploadToDriveRes = axios.post(`${api}/upload-to-drive`, {
    //   //   key: `${formattedName}.zip`,
    //   // })
    // } catch (error) {
    //   console.log(error)
    // }

    // async function uploadFilesToDrive() {
    //   try {
    //     const res = await axios.post(`${api}/upload-to-drive`, {
    //       Key: `${formattedName}.zip`,
    //     })
    //     const data = await res.json()
    //     console.log(data)
    //   } catch (error) {}
    // }

    if (!files) return console.error("Please select 1 or more files")

    const formData = new FormData()
    //append name
    formData.append("name", name)
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
        },
      })
      const data = res.data
      if (data !== "success") return
      console.log("succesfully uploaded!")
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { uploadPercentage, dragEnter, files } = this.state

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
              Je kunt hier meerdere foto's uploaden zonder kwaliteitsverlies.
              Pdf's en andere files behoren ook to de mogelijkheden.
            </div>
            {uploadPercentage ? (
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
                <form onSubmit={e => this.handleSubmit(e)}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Naam/bedrijfsnaam"
                      onChange={e => this.setState({ name: e.target.value })}
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
                  {uploadPercentage && (
                    <div className="progressBar form-group">
                      <div
                        style={{ width: uploadPercentage + "%" }}
                        className="fill"
                      >{`${uploadPercentage}%`}</div>
                    </div>
                  )}
                  <div className="buttonGroup" style={{ marginBottom: 30 }}>
                    <input className="btn full" type="submit" value="Upload" />
                    {/* render go back button only on contactpage */}
                    {onCustomBackClick && (
                      <button
                        onClick={onCustomBackClick}
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
