import React from "react"
import Link from "next/link"
import Error from "next/error"
import { useRouter } from "next/router"
import * as matter from "gray-matter"
import Layout from "../../components/layout"
import Git from "../../components/git"
import markdown from "../../lib/micromark"
import { fetchIndex, fetchDir } from "../../lib/data"

export async function getStaticPaths() {
  const { lists } = await fetchIndex()
  const paths = lists.map((list) => ({
    params: {
      aid: list.aid,
    },
  }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const { aid } = params
  const data = await fetchDir(aid)

  return { props: { data, params }, revalidate: 1 }
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

  const { aid, content, author, lastmod, title, wordCount, pages } = data
  const rq = new Date(lastmod).toLocaleDateString()
  const html = markdown(
    content.replace(
      /!\[(.*)\]\(\/(.*)\)/g,
      "![$1](https://cdn.jsdelivr.net/gh/lzjluzijie/lgqm-tuku@main/$2)"
    )
  )

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
          本卷共收录 {pages.length} 篇文章，约 {wordCount} 字。
        </p>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>编号</th>
              <th>标题</th>
              <th>字数</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((single) => (
              <tr key={single.zid}>
                <td>{`${single.aid}.${single.zid}`}</td>
                <td>
                  <Link href="/[aid]/[zid]" as={`/${aid}/${single.zid}`}>
                    <a>{single.title}</a>
                  </Link>
                </td>
                <td>{single.wordCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </Layout>
  )
}
