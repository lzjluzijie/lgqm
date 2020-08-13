import React, { useState, useEffect } from "react"
import Head from "next/head"
import Navbar from "./navbar"

const defaultFontSize = 0

export default function Layout({ children, title, ...props }) {
  const [fontSize, setFontSize] = useState(defaultFontSize)
  const fd = () => {
    if (fontSize >= 8) return
    setFontSize(fontSize + 1)
    window.localStorage.setItem("fontsize", fontSize + 1)
  }
  const sx = () => {
    if (fontSize <= -8) return
    setFontSize(fontSize - 1)
    window.localStorage.setItem("fontsize", fontSize - 1)
  }
  useEffect(() => {
    if (!window.localStorage.getItem("fontsize")) {
      window.localStorage.setItem("fontsize", defaultFontSize)
    }
    const s = parseInt(window.localStorage.getItem("fontsize"))
    setFontSize(s)
  }, [])
  const fs = `${Math.pow(1.125, fontSize)}em`

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
        <div className="content" style={{ fontSize: fs }}>
          {children}
        </div>
      </section>
    </>
  )
}
