import { micromark } from "micromark"
import { gfmFootnote, gfmFootnoteHtml } from "micromark-extension-gfm-footnote"

const markdown = (doc) =>
  micromark(doc, {
    extensions: [gfmFootnote({ inlineNotes: true })],
    htmlExtensions: [gfmFootnoteHtml()],
  })

export default markdown
