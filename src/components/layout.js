/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Nav from "./nav"

import "./style.scss"

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    size: 5,
  }
  updateSize = () => {
    this.setState({ size: localStorage.getItem(`size`) })
  }
  render = () => (
    <>
      <Nav updateSize={this.updateSize} />
      <section className={`section`}>
        <main className={`container is-size-${this.state.size}`}>
          {this.props.children}
        </main>
      </section>
    </>
  )
}
