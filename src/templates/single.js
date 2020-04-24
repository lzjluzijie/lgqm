import React from "react"
import { navigate } from "@reach/router"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Next from "../components/next"
import Git from "../components/git"

export default ({ data, pageContext }) => {
  const handleKeyboard = e => {
    console.log(e)
    switch (e.keyCode) {
      case 37:
        navigate(
          pageContext.prev ? pageContext.prev.slug : pageContext.parent.slug
        )
        break
      case 39:
        navigate(
          pageContext.next ? pageContext.next.slug : pageContext.parent.slug
        )
        break
    }
  }

  return (
    <Layout>
      <SEO title={data.markdownRemark.frontmatter.title} />
      <Next
        prev={pageContext.prev}
        parent={pageContext.parent}
        next={pageContext.next}
      ></Next>
      <article
        className={"post content"}
        onKeyDown={handleKeyboard}
        tabIndex="0"
      >
        <h1 className={"title has-text-centered"}>
          {data.markdownRemark.frontmatter.title}
        </h1>
        <p className={"subtitle has-text-centered"}>
          <Link to={pageContext.parent.slug}>{pageContext.parent.title}</Link>
          {" | "}
          {data.markdownRemark.frontmatter.author}
          {" | "}
          {new Date(data.markdownRemark.fields.lastmod).toLocaleDateString()}
          {" | "}
          <Git path={data.markdownRemark.fields.path}></Git>
        </p>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      </article>
      <Next
        prev={pageContext.prev}
        parent={pageContext.parent}
        next={pageContext.next}
      ></Next>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        aid
        zid
        title
        author
      }
      fields {
        lastmod
        slug
        path
      }
    }
  }
`
