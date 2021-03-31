import React, { useState } from "react"
import Layout from "../components/layout"
import markdown from "../utils/micromark"
import useStorage from "../utils/storage"

export default function Editor() {
  const [raw, setRaw] = useStorage("editor-raw", "# 临高启明")
  const handleChange = (event) => {
    setRaw(event.target.value)
  }
  const data = markdown(raw)
  return (
    <Layout title="编辑器">
      <article className="post content">
        <h2 className="title">Markdown 编辑器</h2>
        <div className="columns">
          <textarea
            className="column"
            value={raw}
            onChange={handleChange}
            rows={100}
            style={{ width: "100%" }}
          />
          <div
            className="column"
            dangerouslySetInnerHTML={{ __html: data }}
          ></div>
        </div>
      </article>
    </Layout>
  )
}
