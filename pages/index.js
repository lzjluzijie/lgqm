import Link from "next/link"
import Layout from "../components/layout"

async function fetchIndex() {
  const res = await fetch(`https://lgqm-sjk.halu.lu/index.json`)
  if (res.ok) {
    return res.json()
  }
  throw new Error(`Error`)
}

export const getStaticProps = async ({ params }) => {
  try {
    const { data } = await fetchIndex()
    return { props: { data }, revalidate: 1 }
  } catch (error) {
    return { props: {} }
  }
}

export default function Home({ data }) {
  const { lists } = data

  return (
    <Layout title="主页">
      <article className="post content">
        <h2 className="title has-text-centered">目录</h2>
        <p className="subtitle" style={{ fontSize: "1.25em" }}>
          以下是已收录分卷列表，共 {lists.length} 卷
        </p>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>编号</th>
              <th>标题</th>
              <th>作者</th>
              <th>文章数量</th>
              <th>上次修改</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list) => (
              <tr key={list.aid}>
                <td>{list.aid}</td>
                <td>
                  <Link href="/[aid]/" as={`/${list.aid}/`}>
                    <a>{list.title}</a>
                  </Link>
                </td>
                <td>{list.author}</td>
                <td>{list.length}</td>
                <td>{new Date(list.lastmod).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </Layout>
  )
}
