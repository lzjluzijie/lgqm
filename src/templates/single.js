import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Next from "../components/next"

export default ({ data, pageContext }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <Next
        prev={pageContext.prev}
        parent={pageContext.parent}
        next={pageContext.next}
      ></Next>
      <article className={"post content"}>
        <h1 className={"title has-text-centered"}>{post.frontmatter.title}</h1>
        <p className={"subtitle has-text-centered"}>
          <Link to={pageContext.parent.fields.slug}>
            {pageContext.parent.frontmatter.title}
          </Link>
          {" | "}
          {post.frontmatter.author}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
    }
  }
`
