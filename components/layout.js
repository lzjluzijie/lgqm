import React, { useState, useEffect } from "react"
import Head from "next/head"
import Link from "next/link"
import { useStorage } from "../utils/hooks"
// import Header from './Header'

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

export default function Layout({ children, title, ...props }) {
  const [fontSize, setFontSize] = useStorage("fontsize", 0)
  const fd = () => {
    if (fontSize >= 8) return
    setFontSize(fontSize + 1)
  }
  const sx = () => {
    if (fontSize <= -8) return
    setFontSize(fontSize - 1)
  }
  const fs = Math.pow(1.125, fontSize)

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png "
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#da532c" />

        <title>{title} | 临高启明公开图书馆</title>
      </Head>
      <Navbar fd={fd} sx={sx} />
      <section className="container mx-auto">
        <div className="content" style={{ fontSize: `${fs}em` }}>
          {children}
        </div>
      </section>
    </>
  )
}
