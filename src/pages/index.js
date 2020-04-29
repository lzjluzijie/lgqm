import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LinkBox = ({ to, title, subtitle }) => (
  <Link className="column has-text-centered" to={to}>
    <div className="box">
      <p className="title is-3">{title}</p>
      <p className="subtitle is-4 is-marginless">{subtitle}</p>
    </div>
  </Link>
)

const IndexPage = () => (
  <Layout>
    <SEO
      title="主页"
      description="临高启明公开图书馆为爱好者建立的开源项目，目的是为临高启明读者提供较好的阅读与讨论环境，目前还处于初创阶段。本站非官方，无版权，请勿用于商业用途！"
    />
    <article className={"post content"}>
      <h1 className={"title has-text-centered"}>
        欢迎来到：临高启明公开图书馆
      </h1>
      <p className={"subtitle"}>
        临高启明公开图书馆为爱好者建立的开源项目，目的是为临高启明读者提供较好的阅读与讨论环境，目前还处于初创阶段。本站非官方，无版权，请勿用于商业用途！
      </p>
    </article>
    <section className="content container columns">
      <LinkBox to="/catalog/" title="目录" subtitle="点击开始阅读" />
      <LinkBox to="/0000/" title="指南" subtitle="查看网站介绍" />
    </section>
  </Layout>
)

export default IndexPage
