import React from "react"
import Head from "next/head"
import Navbar from "./navbar"
import useStorage from "../lib/storage"
import Giscus from '@giscus/react'

const defaultFontSize = 0

export default function Layout({ children, title, ...props }) {
  const [fontSize, setFontSize] = useStorage("font-size", defaultFontSize)
  const fd = () => {
    if (fontSize >= 8) return
    setFontSize(fontSize + 1)
  }
  const sx = () => {
    if (fontSize <= -8) return
    setFontSize(fontSize - 1)
  }
  const fs = `${Math.pow(1.125, fontSize)}em`

  return (
    <>
      <Head>
        <title>{`${title} | 临高启明公开图书馆`}</title>
      </Head>
      <Navbar fd={fd} sx={sx} />
      <section className="section">
        <main className="container" style={{ fontSize: fs }}>
          {children}
        </main>
      </section>
      <section className="section">
        <main className="container">
          <Giscus
            id="comments"
            repo="lzjluzijie/lgqm-giscus"
            repoId="R_kgDONW3QMQ"
            category="Giscus"
            categoryId="DIC_kwDONW3QMc4Ckv9N"
            mapping="pathname"
            term="Hello"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="preferred_color_scheme"
            lang="zh-CN"
            loading="lazy"
          />
        </main>
      </section>
    </>
  )
}
