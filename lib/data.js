import path from "path"
import fs from "fs"
import * as matter from "gray-matter"

const root = process.cwd()
const content = "content"
const IndexName = "_index.md"
const dataMap = new Map()

export async function fetchPage(...paths) {
  const pagePath = path.join(root, content, ...paths)
  const pageData = fs.readFileSync(pagePath)
  return pageData.toString()
}

export async function fetchDir(...paths) {
  const dirPath = path.join(root, content, ...paths)
  if (dataMap.has(dirPath)) {
    return dataMap[dirPath]
  }

  const indexPath = path.join(dirPath, IndexName)
  const indexData = fs.readFileSync(indexPath).toString()
  const indexMa = matter(indexData)
  let data = indexMa.data
  data.content = indexMa.content
  data.date = new Date().toISOString()
  data.lastmod = new Date().toISOString()
  data.wordCount = 0
  data.pages = []

  const files = fs.readdirSync(dirPath)
  files.map(async (filename) => {
    if (filename === IndexName) return

    const filePath = path.join(dirPath, filename)
    const fileData = fs.readFileSync(filePath).toString()
    const fileMa = matter(fileData)
    let page = fileMa.data
    page.date = new Date().toISOString()
    page.lastmod = new Date().toISOString() // todo
    page.wordCount = fileMa.content.length
    data.pages.push(page)
    data.wordCount += page.wordCount
  })

  dataMap[dirPath] = data
  return data
}

export async function fetchIndex() {
  const contentPath = path.join(root, content)
  const dirs = fs.readdirSync(contentPath)
  const data = {
    lists: [],
  }

  await dirs.map(async (dir) => {
    const list = await fetchDir(dir)
    data.lists.push({
      aid: list.aid,
      title: list.title,
      author: list.author,
      lastmod: list.lastmod,
      wordCount: list.wordCount,
      length: list.pages.length,
    })
  })

  return data
}
