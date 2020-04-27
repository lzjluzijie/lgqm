import React from "react"
import { Link } from "gatsby"

export default class Navbar extends React.Component {
  state = {
    activeMenu: false,
  }
  toggleMenu = () => {
    this.setState({
      activeMenu: !this.state.activeMenu,
    })
  }
  larger = () => {
    if (!localStorage.getItem(`size`)) localStorage.setItem(`size`, 6)
    let size = localStorage.getItem(`size`)
    if (size >= 2) size--
    localStorage.setItem(`size`, size)
    this.props.updateSize()
  }
  smaller = () => {
    if (!localStorage.getItem(`size`)) localStorage.setItem(`size`, 6)
    let size = localStorage.getItem(`size`)
    if (size <= 6) size++
    localStorage.setItem(`size`, size)
    this.props.updateSize()
  }
  render = () => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <strong>临高启明</strong>
        </Link>
        <button
          className={`button navbar-burger burger ${
            this.activeMenu ? "is-active" : ""
          }`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-main"
          onClick={this.toggleMenu}
          href="/#"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div
        id="navbar-main"
        className={`navbar-menu ${this.state.activeMenu ? "is-active" : ""}`}
      >
        <div className="navbar-start">
          <Link className="navbar-item" to="/catalog/">
            目录
          </Link>
          <Link className="navbar-item" to="/0000/">
            指南
          </Link>
          <a className="navbar-item" href="https://t.me/lingaoqiming">
            讨论群
          </a>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" href="/#">
              更多
            </a>
            <div className="navbar-dropdown">
              <a
                className="navbar-item"
                href="https://book.qidian.com/info/1262627"
              >
                起点
              </a>
              <a className="navbar-item" href="https://chuiniu.duanshu.com/">
                短书
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item" href="https://lgqm.gq/">
                论坛
              </a>
              <a className="navbar-item" href="https://lgqm.huijiwiki.com/">
                Wiki
              </a>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button
                id="button-size-inc"
                className="button is-info"
                onClick={this.larger}
              >
                放大字体
              </button>
              <button
                id="button-size-dec"
                className="button is-info"
                onClick={this.smaller}
              >
                缩小字体
              </button>
              <a
                className="button is-primary"
                href="https://gitee.com/halulu/lgqm"
              >
                Git
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
