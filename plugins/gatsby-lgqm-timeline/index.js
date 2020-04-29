module.exports = (node, pluginOptions) => {
  if (node.sourceInstanceName !== `data`) return
  console.log(node)
  
  return node.markdownAST
}
