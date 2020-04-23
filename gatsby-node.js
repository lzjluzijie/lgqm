const path = require(`path`)
const execa = require(`execa`)
const { createFilePath } = require(`gatsby-source-filesystem`)

let lastmodMap = new Map()

try {
  const { stdout } = execa.sync(`git`, [
    `-c`,
    `diff.renames=0`,
    `-c`,
    `log.showSignature=0`,
    `-C`,
    `.`,
    `log`,
    `--name-only`,
    `--no-merges`,
    `--format=format:!%ai!`,
    `HEAD`,
  ])
  let lastmod = +new Date()
  stdout.split(`\n`).forEach(line => {
    if (line[0] === `!` && line[line.length - 1] === `!`) {
      lastmod = +new Date(line.substring(1, line.length - 1))
      // console.log(lastmod)
    } else if (line !== ``) {
      lastmodMap.set(line, lastmod)
    }
  })
} catch (e) {
  console.log(e)
}

// console.log(lastmodMap)
console.log(`Finished loading lastmod`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const file = getNode(node.parent)
    const isList = file.base === `_index.md`
    const type = isList ? `list` : `single`
    const slug = isList
      ? `/${file.relativeDirectory}/`
      : createFilePath({ node, getNode })

    const time = node.frontmatter.lastmod
      ? +new Date(node.frontmatter.lastmod)
      : lastmodMap.get(`content/${file.relativePath}`)

    createNodeField({
      node,
      name: `lastmod`,
      value: time,
    })

    createNodeField({
      node,
      name: `path`,
      value: file.relativePath,
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
            html
            fields {
              type
              lastmod
              slug
              path
            }
            frontmatter {
              aid
              zid
              title
              author
            }
          }
        }
      }
    }
  `)

  if (singleResult.errors) throw singleResult.errors

  const singles = singleResult.data.allMarkdownRemark.edges

  console.log("Start to create single pages")

  singles.forEach((post, index) => {
    const node = post.node
    // console.log(node.fields.path)
    // node.fields.lastmod = lastmodMap.get(node.fields.path)
    // console.log(node.fields.lastmod)

    const parent = lists.get(node.frontmatter.aid)
    // parent.singles.push(node)

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
        title: node.frontmatter.title,
        author: node.frontmatter.author,
        lastmod: node.fields.lastmod,
        slug: node.fields.slug,
        rPath: node.fields.path,
        html: node.html,
        parent: { ...parent.fields, ...parent.frontmatter },
        prev: prev && { ...prev.fields, ...prev.frontmatter },
        next: next && { ...next.fields, ...next.frontmatter },
      },
    })
  })

  console.log("Single pages finished")

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
