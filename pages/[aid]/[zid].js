import React from "react"
import Link from "next/link"
import Error from "next/error"
import { useRouter } from "next/router"
import * as matter from "gray-matter"
import Layout from "../../components/layout"
import Git from "../../components/git"
import remark from "../../utils/remark"

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

async function fetchList(aid) {
  const res = await fetch(`https://lgqm-sjk.halu.lu/${aid}/index.json`)
  if (res.ok) {
    return res.json()
  }
  throw new Error(`Error`)
}

async function fetchSingle(aid, zid) {
  const res = await fetch(
    `https://raw.githubusercontent.com/lzjluzijie/lgqm-sjk/main/content/${aid}/${zid}.md`
    // `https://cdn.jsdelivr.net/gh/lzjluzijie/lgqm-sjk@main/content/${aid}/${zid}.md`
  )
  if (res.ok) {
    return res.text()
  }
  throw new Error(`Error`)
}

export const getStaticProps = async ({ params }) => {
  const { aid, zid } = params

  try {
    const f1 = fetchSingle(aid, zid)
    const f2 = fetchList(aid)
    const text = await f1
    const parent = await f2
    const { title, singles } = parent.data

    const i = singles.findIndex((e) => e.zid === zid)
    const data = {
      text,
      pt: title,
      lastmod: singles[i].lastmod,
      wordCount: singles[i].wordCount,
    }

    if (i !== 0) {
      data.prev = {
        title: singles[i - 1].title,
        zid: singles[i - 1].zid,
      }
    }
    if (i !== singles.length - 1) {
      data.next = {
        title: singles[i + 1].title,
        zid: singles[i + 1].zid,
      }
    }

    return { props: { data, params }, revalidate: 1 }
  } catch (error) {
    return { props: {} }
  }
}

const Next = ({ prev, next, aid, pt }) => (
  <nav className="columns">
    <div className="column has-text-centered">
      <p className="title" style={{ fontSize: "1.25em" }}>
        {prev ? "上一章" : "返回"}
      </p>
      <Link
        className="subtitle"
        href={prev ? "/[aid]/[zid]" : "/[aid]/"}
        as={prev ? `/${aid}/${prev.zid}` : `/${aid}/`}
      >
        <a>{prev ? prev.title : pt}</a>
      </Link>
    </div>
    <div className="column has-text-centered">
      <p className="title" style={{ fontSize: "1.25em" }}>
        {next ? "下一章" : "返回"}
      </p>
      <Link
        className="subtitle"
        href={next ? "/[aid]/[zid]" : "/[aid]/"}
        as={next ? `/${aid}/${next.zid}` : `/${aid}/`}
      >
        <a>{next ? next.title : pt}</a>
      </Link>
    </div>
  </nav>
)

export default function Single({ data }) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <Layout title="Loading">
        <div>Loading...</div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout title="">
        <Error text="No data" />
      </Layout>
    )
  }

  const { text, pt, lastmod, wordCount, next, prev } = data
  const rq = new Date(lastmod).toLocaleDateString()
  const ma = matter(text)
  const { aid, zid, title, author } = ma.data
  const html = remark(ma.content)

  return (
    <Layout title={title}>
      <Next prev={prev} next={next} aid={aid} pt={pt} />
      <article className="post content">
        <h3 className="title has-text-centered">{title}</h3>
        <p
          className="subtitle has-text-centered"
          style={{ fontSize: "1.25em" }}
        >
          <Link href="/[aid]/" as={`/${aid}/`}>
            <a>{pt}</a>
          </Link>
          {` | ${author} | ${rq} | 共 ${wordCount} 字 | `}
          <Git path={`content/${aid}/${zid}.md`}></Git>
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <Next prev={prev} next={next} aid={aid} pt={pt} />
    </Layout>
  )
}
