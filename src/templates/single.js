import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Next from "../components/next"
import Git from "../components/git"

export default ({ data, pageContext }) => (
  <Layout>
    <SEO title={data.markdownRemark.frontmatter.title} />
    <Next
      prev={pageContext.prev}
      parent={pageContext.parent}
      next={pageContext.next}
    ></Next>
    <article className={"post content"}>
      <h1 className={"title has-text-centered"}>
        {data.markdownRemark.frontmatter.title}
      </h1>
      <p className={"subtitle has-text-centered"}>
        <Link to={pageContext.parent.fields.slug}>
          {pageContext.parent.frontmatter.title}
        </Link>
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
