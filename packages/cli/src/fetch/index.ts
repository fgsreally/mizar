import type { Page } from 'puppeteer'
import type { FetchOptions } from '../types'

export async function handleFetch(page: Page, opts: FetchOptions) {
  const { sourcemapParser, htmlTags, reqEventHandler } = opts
  // Create a new Chrome Devtools Protocol Session
  const client = await page.target().createCDPSession()

  await client.send('Fetch.enable', {
    patterns: [
      {
        urlPattern: '*',
        requestStage: 'Response',
      },
    ],
  })

  await client.on('Fetch.requestPaused', async (reqEvent) => {
    // Retrieve EventID
    const { requestId, request: { url } } = reqEvent

    await reqEventHandler?.(reqEvent)
    if (url.endsWith('.js') && sourcemapParser?.(url)) {
      const responseHeaders = reqEvent.responseHeaders || []
      if (!responseHeaders.some(({ name }: any) => name === 'Content-Type')) {
        responseHeaders.push({
          name: 'Content-Type',
          value: 'application/javascript; charset=utf-8',
        })
      }
      const sourcemapUrl = sourcemapParser(url)
      console.log(`sourcemap:${sourcemapUrl}`)
      const responseObj = await client.send('Fetch.getResponseBody', {
        requestId,
      })

      const jsStr = Buffer.from(responseObj.body, 'base64').toString()
      const ret = `${jsStr}\n//# sourceMappingURL=${sourcemapUrl}.map`
      return await client.send('Fetch.fulfillRequest', {
        requestId,
        responseCode: 200,
        responseHeaders,
        body: Buffer.from(ret).toString('base64'),
      })
    }

    if (url.endsWith('.html')) {
      const responseHeaders = reqEvent.responseHeaders || []
      if (!responseHeaders.some(({ name }: any) => name === 'Content-Type')) {
        responseHeaders.push({
          name: 'Content-Type',
          value: ' text/html; charset=utf-8',
        })
      }
      const responseObj = await client.send('Fetch.getResponseBody', {
        requestId,
      })
      let html = Buffer.from(responseObj.body, 'base64').toString()
      if (htmlTags) {
        htmlTags.forEach((item) => {
          if (!item.injectTo)
            item.injectTo = 'body'
          switch (item.injectTo) {
            case 'body':
              html = html.replace('</body>', `${item.tag}</body>`)
              break
            case 'body-prepend':
              html = html.replace(/<body\b[^>]*>/, _ => _ + item.tag)
              break
            case 'head':
              html = html.replace('</head>', `${item.tag}</head>`)
              break
            case 'head-prepend':
              html = html.replace(/<head\b[^>]*>/, _ => _ + item.tag)
              break
          }
        })
      }
      // html = htmlParser?.(html) || html

      return await client.send('Fetch.fulfillRequest', {
        requestId,
        responseCode: 200,
        responseHeaders,
        body: Buffer.from(html).toString('base64'),
      })
    }
    await client.send('Fetch.continueRequest', { requestId })
  })
}
