module.exports = {
  async redirects() {
    return [
      {
        source: "/archive",
        destination: "/",
        permanent: true,
      },
      {
        source: "/catalog",
        destination: "/",
        permanent: true,
      },
      {
        source: "/9025",
        destination: "https://beichao.halu.lu",
        permanent: true,
      },
      {
        source: "/9025/:zid",
        destination: "https://beichao.halu.lu/beichao/:zid/",
        permanent: true,
      },
    ]
  },
}
