const path = require(`path`)
const execa = require(`execa`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const file = getNode(node.parent)
    const isList = file.base === `_index.md`
    const type = isList ? `list` : `single`
    const slug = isList
      ? `/${file.relativeDirectory}/`
      : createFilePath({ node, getNode })

    let time = node.frontmatter.lastmod
    if (time === undefined) {
      const { stdout } = execa.sync(`git`, [
        `log`,
        `-1`,
        `--pretty=format:%aI`,
        file.absolutePath,
      ])
      // console.log(stdout)
      time = stdout
    }

    createNodeField({
      node,
      name: `lastmod`,
      value: +new Date(time),
    })

    createNodeField({
      node,
      name: `type`,
      value: type,
    })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const listResult = await graphql(`
    query {
      allMarkdownRemark(
        sort: { fields: frontmatter___aid }
        filter: { fields: { type: { eq: "list" } } }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              aid
              title
            }
          }
        }
      }
    }
  `)

  if (listResult.errors) throw listResult.errors

  const lists = new Map()

  listResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    node.singles = new Array()
    lists.set(node.frontmatter.aid, node)
  })

  const singleResult = await graphql(`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___aid, frontmatter___zid] }
        filter: { fields: { type: { eq: "single" } } }
      ) {
        edges {
          node {
            fields {
              slug
              type
            }
            frontmatter {
              aid
              title
            }
          }
        }
      }
    }
  `)

  if (singleResult.errors) throw singleResult.errors

  const singles = singleResult.data.allMarkdownRemark.edges
  singles.forEach((post, index) => {
    const node = post.node

    const parent = lists.get(node.frontmatter.aid)
    parent.singles.push(node)

    const prev =
      index === 0 ||
      node.frontmatter.aid !== singles[index - 1].node.frontmatter.aid
        ? null
        : singles[index - 1].node
    const next =
      index === singles.length - 1 ||
      node.frontmatter.aid !== singles[index + 1].node.frontmatter.aid
        ? null
        : singles[index + 1].node

    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/single.js`),
      context: {
        aid: node.frontmatter.aid,
        zid: node.frontmatter.zid,
        slug: node.fields.slug,
        parent,
        prev,
        next,
      },
    })
  })

  listResult.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/list.js`),
      context: {
        aid: node.frontmatter.aid,
        slug: node.fields.slug,
      },
    })
  })
}
