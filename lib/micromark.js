import { micromark } from 'micromark'
import { gfm, gfmHtml } from 'micromark-extension-gfm'

export default function markdown(doc) {
  doc = doc || ''
  return micromark(doc, {
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  })
}