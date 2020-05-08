import React, { Fragment, useState } from "react"
import axios from "axios"
// import "./styles/upload.css";

function Upload(props) {
  const [files, setFiles] = useState()
  const [name, setName] = useState("")
  const api =
    "https://zecs44yyx7.execute-api.eu-central-1.amazonaws.com/prod/upload-url"

  function handleFileUpload({ target: input }) {
    const fileList = input.files
    setFiles([...fileList])
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    //append name
    formData.append("name", name)
    // append files
    for (let file of files) {
      formData.append("images", file)
    }

    // 1. get upload url
    try {
      const res = await axios.post(
        api,
        {
          name: name
            .toLowerCase()
            .split(" ")
            .join(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const data = await res.data
      console.log(data)
    } catch (error) {
      console.log(error)
    }

    // try {
    //   const res = await axios.post(`${api}/upload`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   const data = res.data
    //   console.log(data)
    // } catch (err) {
    //   console.log(err)
    // }
  }

  return (
    <Fragment>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          placeholder="Your name please"
          type="text"
          name="name"
          id="name"
          onChange={e => setName(e.target.value)}
        />
        <input
          onChange={e => handleFileUpload(e)}
          type="file"
          name="images"
          id="images"
          multiple
        />
        <input type="submit" value="Upload" className="btn btn-primary" />
      </form>
      <ul className="files">
        {files
          ? files.map((file, index) => (
              <li key={index} className="uploadedFile">
                <span className="name">{file.name}</span>
                <span className="size">{`${Math.round(
                  file.size / 1000
                )}kb`}</span>
              </li>
            ))
          : null}
      </ul>
    </Fragment>
  )
}

export default Upload
