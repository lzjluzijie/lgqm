import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="主页" />
    <article className={"post content"}>
      <h1 className={"title has-text-centered"}>欢迎来到 临高启明公开图书馆</h1>
      <p className={"subtitle"}>施工中，请使用上方的导航栏</p>
    </article>
  </Layout>
)

export default IndexPage
