import React from "react"
import Link from "next/link"
import Error from "next/error"
import { useRouter } from "next/router"
import * as matter from "gray-matter"
import Layout from "../../components/layout"
import Git from "../../components/git"
import markdown from "../../utils/micromark"

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

async function fetchList(aid) {
  const res = await fetch(`https://lgqm-sjk.halu.lu/${aid}/index.json`)
  if (res.status == 404) return null
  if (res.ok) {
    return res.json()
  }
  throw new Error(`Error`)
}

async function fetchListIndex(aid) {
  const res = await fetch(
    `https://raw.githubusercontent.com/lzjluzijie/lgqm-sjk/main/content/${aid}/_index.md`
  )
  if (res.status == 404) return null
  if (res.ok) {
    return res.text()
  }
  throw new Error(`Error`)
}

export const getStaticProps = async ({ params }) => {
  const { aid } = params

  try {
    const f1 = fetchList(aid)
    const f2 = fetchListIndex(aid)
    const list = await f1
    const index = await f2
    if (!list || !index) return { props: { data: null } }
    return { props: { data: { list, index }, params }, revalidate: 1 }
  } catch (error) {
    console.error(error)
    return { props: {} }
  }
}

export default function List({ data }) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <Layout title="加载中">
        <div id="loading">加载中...</div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout title="404 未找到页面">
        <Error statusCode={404} title="未找到页面" />
      </Layout>
    )
  }

  const { list, index } = data
  const ma = matter(index)
  const { aid, author, lastmod, title, wordCount, singles } = list.data
  const rq = new Date(lastmod).toLocaleDateString()
  const content = ma.content.replace(
    /!\[(.*)\]\(\/(.*)\)/g,
    "![$1](https://cdn.jsdelivr.net/gh/lzjluzijie/lgqm-tuku@main/$2)"
  )
  const html = markdown(content)

  return (
    <Layout title={title}>
      <article className="post content">
        <h3 className="title has-text-centered">{title}</h3>
        <p
          className="subtitle has-text-centered"
          style={{ fontSize: "1.25em" }}
        >
          {`${author} | ${rq} | `}
          <Git path={`content/${aid}/_index.md`}></Git>
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <p className="subtitle mt-6" style={{ fontSize: "1.25em" }}>
          本卷共收录 {singles.length} 篇文章，共 {wordCount} 字。
        </p>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>编号</th>
              <th>标题</th>
              <th>字数</th>
              <th>上次修改</th>
            </tr>
          </thead>
          <tbody>
            {singles.map((single) => (
              <tr key={single.zid}>
                <td>{`${single.aid}.${single.zid}`}</td>
                <td>
                  <Link href="/[aid]/[zid]" as={`/${aid}/${single.zid}`}>
                    <a>{single.title}</a>
                  </Link>
                </td>
                <td>{single.wordCount}</td>
                <td>{new Date(single.lastmod).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </Layout>
  )
}
