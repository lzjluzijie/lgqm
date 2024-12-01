import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
      window.gtag('config', 'G-N915MBK8Q7', {
        page_path: url,
      })
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
