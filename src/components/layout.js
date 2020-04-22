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

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <section className={`section`}>
        <main className={`container`}>{children}</main>
      </section>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
