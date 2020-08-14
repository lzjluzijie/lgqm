import Error from "next/error"

export default NotFound = () => (
  <Error statusCode={404} title="未找到页面">
    您访问的页面不存在
  </Error>
)
