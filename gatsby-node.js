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
    if (node.frontmatter.type === `data`) {
      console.log(`data`)
      return
    }

    const type = isList ? `list` : `single`
    const slug = isList
      ? `/${file.relativeDirectory}/`
      : createFilePath({ node, getNode })

    const time =
      (node.frontmatter.lastmod
        ? +new Date(node.frontmatter.lastmod)
        : lastmodMap.get(`content/${file.relativePath}`)) || +new Date()

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

  listResult.data.allMarkdownRemark.edges.forEach(async ({ node }) => {
    const singleResult = await graphql(`
    query {
      allMarkdownRemark(
        sort: { fields: frontmatter___zid }
        filter: { fields: { type: { eq: "single" } } frontmatter: { aid: {eq: ${node.frontmatter.aid}}} }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

    if (singleResult.errors) throw singleResult.errors

    const singles = singleResult.data.allMarkdownRemark.edges
    const parent = node

    singles.forEach((single, index) => {
      const node = single.node

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
          title: node.frontmatter.title,
          slug: node.fields.slug,
          parent: { ...parent.fields, ...parent.frontmatter },
          prev: prev && { ...prev.fields, ...prev.frontmatter },
          next: next && { ...next.fields, ...next.frontmatter },
        },
      })
    })

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
