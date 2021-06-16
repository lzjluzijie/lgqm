import micromark from "micromark"
import footnote from "micromark-extension-footnote"
import * as footnoteHtml from "micromark-extension-footnote/html"

const markdown = (doc) =>
  micromark(doc, {
    extensions: [footnote({ inlineNotes: true })],
    htmlExtensions: [footnoteHtml],
  })

export default markdown
