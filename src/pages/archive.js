import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const List = ({ node, length }) => (
  <tr>
    <td>{node.frontmatter.aid.toString().padStart(4, `0`)}</td>
    <td>
      <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
    </td>
    <td>{node.frontmatter.author}</td>
    <td>{length}</td>
    <td>{new Date(node.fields.lastmod).toLocaleDateString()}</td>
  </tr>
)

const Single = ({ node }) => <tr></tr>

const Archive = ({ data }) => (
  <Layout>
    <SEO title="目录" />
    <h1 className="title has-text-centered">目录</h1>
    <h2 class="subtitle">
      以下是已收录分卷列表，共 {data.allMarkdownRemark.group.length} 卷
    </h2>
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
        {data.allMarkdownRemark.group
          .sort(
            (a, b) => a.nodes[0].frontmatter.aid > b.nodes[0].frontmatter.aid
          )
          .map(({ nodes }) => (
            <List
              node={nodes[nodes.length - 1]}
              length={nodes.length - 1}
            ></List>
          ))}
      </tbody>
    </table>
  </Layout>
)

export default Archive

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___aid, frontmatter___zid] }
    ) {
      group(field: frontmatter___aid) {
        nodes {
          frontmatter {
            title
            aid
            zid
            author
          }
          fields {
            type
            slug
            lastmod
          }
        }
        totalCount
      }
    }
  }
`
