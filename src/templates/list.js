import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Git from "../components/git"

const id = (aid, zid) =>
  `${aid.toString().padStart(4, `0`)}.${
    zid % 1 === 0
      ? zid.toString().padStart(4, `0`)
      : zid.toFixed(2).padStart(7, `0`)
  }`

// const formatTime = (time) => `${time.getFullYear()}${time.getMonth()}${time.getDay()}`

export default ({ data }) => (
  <Layout>
    <SEO title={data.markdownRemark.frontmatter.title} />
    <article className={"post content"}>
      <h1 className={"title has-text-centered"}>
        {data.markdownRemark.frontmatter.title}
      </h1>
      <p className={"subtitle has-text-centered"}>
        {data.markdownRemark.frontmatter.author}
        {" | "}
        {new Date(data.markdownRemark.fields.lastmod).toLocaleDateString()}
        {" | "}
        <Git path={data.markdownRemark.fields.path}></Git>
      </p>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </article>
    {data.allMarkdownRemark.nodes.length !== 0 && (
      <>
        <p className="subtitle">
          本卷共收录 {data.allMarkdownRemark.nodes.length} 篇文章
        </p>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>编号</th>
              <th>标题</th>
              <th>作者</th>
              <th>上次修改</th>
            </tr>
          </thead>
          <tbody>
            {data.allMarkdownRemark.nodes.map(node => (
              <tr>
                <td>{id(node.frontmatter.aid, node.frontmatter.zid)}</td>
                <td>
                  <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </td>
                <td>{node.frontmatter.author}</td>
                <td>{new Date(node.fields.lastmod).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </Layout>
)

export const query = graphql`
  query($aid: Int!, $slug: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { aid: { eq: $aid } }
        fields: { type: { eq: "single" } }
      }
      sort: { fields: frontmatter___zid }
    ) {
      nodes {
        frontmatter {
          zid
          title
          aid
          author
        }
        fields {
          lastmod
          slug
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        aid
        title
        author
      }
      fields {
        lastmod
        path
      }
    }
  }
`
