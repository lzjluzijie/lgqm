import React from "react"
import { Link } from "gatsby"

const Next = ({ prev, parent, next }) => {
  const nop = prev && prev.fields.type === `single`
  const non = next && next.fields.type === `single`
  return (
    <nav className="columns" style={{ padding: "20px" }}>
      <div className="column has-text-centered">
        <p className="subtitle">{nop ? `上一章` : `返回`}</p>
        <Link
          className="title"
          to={nop ? prev.fields.slug : parent.fields.slug}
        >
          {nop ? prev.frontmatter.title : parent.frontmatter.title}
        </Link>
      </div>
      <div className="column has-text-centered">
        <p className="subtitle">{non ? `下一章` : `返回`}</p>
        <Link
          className="title"
          to={non ? next.fields.slug : parent.fields.slug}
        >
          {non ? next.frontmatter.title : parent.frontmatter.title}
        </Link>
      </div>
    </nav>
  )
}

export default Next
