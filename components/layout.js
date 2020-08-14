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
        <title>{title} | 临高启明公开图书馆</title>
      </Head>
      <Navbar fd={fd} sx={sx} />
      <section className="section">
        <main className="container" style={{ fontSize: fs }}>
          {children}
        </main>
      </section>
    </>
  )
}
