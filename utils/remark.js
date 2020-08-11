import unified from "unified"
import markdown from "remark-parse"
import footnotes from "remark-footnotes"
import remark2rehype from "remark-rehype"
import html from "rehype-stringify"

const remark = unified()
  .use(markdown)
  .use(footnotes)
  .use(remark2rehype)
  .use(html).processSync

export default remark
