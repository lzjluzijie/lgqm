import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Next from "../components/next"
import Git from "../components/git"

export default ({ pageContext }) => (
  <Layout>
    <SEO title={pageContext.title} />
    <Next
      prev={pageContext.prev}
      parent={pageContext.parent}
      next={pageContext.next}
    ></Next>
    <article className={"post content"}>
      <h1 className={"title has-text-centered"}>{pageContext.title}</h1>
      <p className={"subtitle has-text-centered"}>
        <Link to={pageContext.parent.slug}>{pageContext.parent.title}</Link>
        {" | "}
        {pageContext.author}
        {" | "}
        {new Date(pageContext.lastmod).toLocaleDateString()}
        {" | "}
        <Git path={pageContext.rPath}></Git>
      </p>
      <div dangerouslySetInnerHTML={{ __html: pageContext.html }} />
    </article>
    <Next
      prev={pageContext.prev}
      parent={pageContext.parent}
      next={pageContext.next}
    ></Next>
  </Layout>
)
