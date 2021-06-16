import Link from "next/link"
import Layout from "../components/layout"
import { fetchIndex } from "../lib/data"

export const getStaticProps = async ({ params }) => {
  try {
    const { lists } = await fetchIndex()
    return { props: { data: {lists} }, revalidate: 1 }
  } catch (error) {
    return { props: {} }
  }
}

export default function Home({ data }) {
  const { lists } = data

  return (
    <Layout title="主页">
      <article className="post content">
        <h1 className="title has-text-centered">
          欢迎来到：临高启明公开图书馆
        </h1>
        <p>
          临高启明公开图书馆为爱好者建立的开源项目，目的是为临高启明读者提供较好的阅读与讨论环境，目前还处于初创阶段。本站非官方，无版权，请勿用于商业用途！
        </p>
        <h2 className="title has-text-centered" id="catalog">
          目录
        </h2>
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
