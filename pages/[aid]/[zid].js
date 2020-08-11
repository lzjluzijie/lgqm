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
    const data = await fetchSingle(aid, zid)
    return { props: { data, params }, revalidate: 1 }
  } catch (error) {
    return { props: {} }
  }
}

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

  const ma = matter(data)
  const { aid, zid, title, author } = ma.data
  const html = remark(ma.content)

  return (
    <Layout title={title}>
      <h3 className="title has-text-centered">{title}</h3>
      <p className="subtitle has-text-centered">
        <Link href="/[aid]/" as={`/${aid}/`}>
          <a>返回分卷</a>
        </Link>
        {" | "}
        {author}
        {" | "}
        <Git path={`content/${aid}/${zid}.md`}></Git>
      </p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}
