import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const List = ({ node, size }) => (
  <tr>
    <td>{node.frontmatter.aid.toString().padStart(4, `0`)}</td>
    <td>
      <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
    </td>
    <td>{node.frontmatter.author}</td>
    <td>{size}</td>
    <td>{new Date(node.fields.lastmod).toLocaleDateString()}</td>
  </tr>
)

const Catalog = ({ data }) => {
  const lists = data.lists.nodes
  data.singles.group.sort(
    (a, b) => parseInt(a.fieldValue) - parseInt(b.fieldValue)
  )

  return (
    <Layout>
      <SEO title="目录" />
      <h1 className="title has-text-centered">目录</h1>
      <h2 className="subtitle">以下是已收录分卷列表，共 {lists.length} 卷</h2>
      <table className="table is-fullwidth">
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
          {data.lists.nodes.map((node, index) => (
            <List
              node={node}
              size={data.singles.group[index].totalCount - 1}
            ></List>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Catalog

export const query = graphql`
  {
    lists: allMarkdownRemark(
      sort: { fields: frontmatter___aid }
      filter: { fields: { type: { eq: "list" } } }
    ) {
      nodes {
        frontmatter {
          title
          aid
          author
        }
        fields {
          type
          slug
          lastmod
        }
      }
    }
    singles: allMarkdownRemark {
      group(field: frontmatter___aid) {
        fieldValue
        totalCount
      }
    }
  }
`
