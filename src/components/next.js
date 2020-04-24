import React from "react"
import { Link } from "gatsby"

const Next = ({ prev, parent, next }) => (
  <nav className="columns">
    <div className="column has-text-centered">
      <p className="subtitle">{prev ? `上一章` : `返回`}</p>
      <Link className="title" to={prev ? prev.slug : parent.slug}>
        {prev ? prev.title : parent.title}
      </Link>
    </div>
    <div className="column has-text-centered">
      <p className="subtitle">{next ? `下一章` : `返回`}</p>
      <Link className="title" to={next ? next.slug : parent.slug}>
        {next ? next.title : parent.title}
      </Link>
    </div>
  </nav>
)

export default Next
