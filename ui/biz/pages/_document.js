import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class RootDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    return (
      <html>
        <Head>
          <title>Biz - purpleshock</title>
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css" />
          {styleTags}
        </Head>
        <body>
          <div className='root'>
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}
