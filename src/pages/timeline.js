import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Archive = ({ data }) => {
  const events = new Array()
  for (const n of data.allMarkdownRemark.nodes) {
    for (const e of n.htmlAst.children) {
      if (e.tagName === `h3`) events.push(e)
    }
  }
  console.log(events)

  return (
    <Layout>
      <SEO title="时间轴" />
      {events.toString()}
    </Layout>
  )
}

export default Archive

export const query = graphql`
{
  allMarkdownRemark(filter: {frontmatter: {type: {eq: "data"}, class: {eq: "timeline"}}}) {
    nodes {
      frontmatter {
        title
        author
      }
      htmlAst
    }
  }
}
`
