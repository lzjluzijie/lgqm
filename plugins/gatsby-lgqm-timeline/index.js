module.exports = (node, pluginOptions) => {
  if (node.sourceInstanceName !== `data`) return
  console.log(`data`)
  console.log(node.base)

  return node.markdownAST
}
