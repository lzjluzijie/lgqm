import React, { useState, useEffect } from "react"
import Link from "next/link"

function Navbar({ fd, sx }) {
  const [menu, setMenu] = useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link href="/">
          <a className="navbar-item">
            <strong>临高启明公开图书馆</strong>
          </a>
        </Link>
        <button
          className={`button navbar-burger burger ${menu && "is-active"}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbar-main"
          onClick={() => setMenu(!menu)}
          href="#"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <div id="navbar-main" className={`navbar-menu ${menu && "is-active"}`}>
        <div className="navbar-start">
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
              <button className="button is-info" onClick={fd}>
                放大字体
              </button>
              <button className="button is-info" onClick={sx}>
                缩小字体
              </button>
              <a
                className="button is-primary"
                href="https://gitee.com/lgqm/sjk"
              >
                数据库
              </a>
              <a
                className="button is-primary"
                href="https://github.com/lzjluzijie/lgqm"
              >
                源码
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
