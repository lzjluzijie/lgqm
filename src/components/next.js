import React from "react"
import { Link } from "gatsby"

const Next = ({ prev, parent, next }) => {
  const nop = prev && prev.type === `single`
  const non = next && next.type === `single`
  return (
    <nav className="columns" style={{ padding: "20px" }}>
      <div className="column has-text-centered">
        <p className="subtitle">{nop ? `上一章` : `返回`}</p>
        <Link className="title" to={nop ? prev.slug : parent.slug}>
          {nop ? prev.title : parent.title}
        </Link>
      </div>
      <div className="column has-text-centered">
        <p className="subtitle">{non ? `下一章` : `返回`}</p>
        <Link className="title" to={non ? next.slug : parent.slug}>
          {non ? next.title : parent.title}
        </Link>
      </div>
    </nav>
  )
}

export default Next
