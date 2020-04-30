import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import a2h from "hast-util-to-html"

const Event = ({ event }) => (
  <tr>
    <td>{event.category}</td>
    <td>{event.title}</td>
    <td dangerouslySetInnerHTML={{ __html: event.html }}></td>
  </tr>
)

const Timeline = ({ data }) => {
  const events = new Array()

  let event = {
    category: `分类`,
    title: `标题`,
    html: `内容`,
  }
  for (const n of data.allMarkdownRemark.nodes) {
    for (const e of n.htmlAst.children) {
      if (e.tagName === `h3`) {
        console.log(e.children[0].value)
        events.push(event)
        event = {
          category: n.frontmatter.title,
          title: e.children[0].value,
          html: ``,
        }
      } else {
        event.html = event.html + a2h(e)
      }
    }
  }
  events.shift()
  events.push(event)
  console.log(events)

  return (
    <Layout>
      <SEO title="时间轴" />
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>分类</th>
            <th>标题</th>
            <th>内容</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <Event event={event} />
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

export default Timeline

export const query = graphql`
  {
    allMarkdownRemark(
      filter: {
        frontmatter: { type: { eq: "data" }, class: { eq: "timeline" } }
      }
    ) {
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
