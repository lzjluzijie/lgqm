import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Archive = ({ data }) => (
  <Layout>
    <SEO title="目录" />
    <h1 className="title has-text-centered">目录</h1>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>编号</th>
          <th>标题</th>
          <th>作者</th>
          <th>文章数量</th>
          <th>上次修改</th>
        </tr>
      </thead>
      <tbody>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <tr>
            <td>{node.frontmatter.aid.toString().padStart(4, `0`)}</td>
            <td>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </td>
            <td>{node.frontmatter.author}</td>
            <td>todo</td>
            <td>todo</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Layout>
)

export default Archive

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___aid }
      filter: { fields: { type: { eq: "list" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            aid
            title
            author
          }
        }
      }
    }
  }
`
