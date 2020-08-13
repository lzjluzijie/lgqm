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

async function fetchListIndex(aid) {
  const res = await fetch(
    `https://raw.githubusercontent.com/lzjluzijie/lgqm-sjk/main/content/${aid}/_index.md`
  )
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

  const { list, index } = data
  const ma = matter(index)
  const { aid, title, author } = ma.data
  const { wordCount, singles } = list.data
  const html = remark(ma.content)

  return (
    <Layout title={title}>
      <h3 className="title has-text-centered">{title}</h3>
      <p className="subtitle has-text-centered" style={{ fontSize: "1.25em" }}>
        {author}
        {" | "}
        <Git path={`content/${aid}/_index.md`}></Git>
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <p className="subtitle" style={{ fontSize: "1.25em" }}>
        本卷共收录 {singles.length} 篇文章，共 {wordCount} 字。
      </p>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>编号</th>
            <th>标题</th>
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
              <td>{new Date(single.lastmod).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}
