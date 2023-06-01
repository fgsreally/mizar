import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null, // full viewport size
  })

  const page = await browser.newPage()

  // Create a new Chrome Devtools Protocol Session
  const client = await page.target().createCDPSession()

  /*
    Fetch.enable
    https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#method-enable

    Enables issuing of requestPaused events. A request will be paused until client calls one of failRequest, fulfillRequest or continueRequest/continueWithAuth.
  */
  await client.send('Fetch.enable', {
    patterns: [
      {
        urlPattern: '*',
        requestStage: 'Response',
      },
    ],
  })

  /*
    Fetch.requestPaused
    https://chromedevtools.github.io/devtools-protocol/tot/Fetch/#event-requestPaused

    Issued when the domain is enabled and the request URL matches the specified filter. The request is paused until the client responds with one of continueRequest, failRequest or fulfillRequest. The stage of the request can be determined by presence of responseErrorReason and responseStatusCode -- the request is at the response stage if either of these fields is present and in the request stage otherwise.
  */
  await client.on('Fetch.requestPaused', async (reqEvent) => {
    // Retrieve EventID
    const { requestId } = reqEvent
    const responseHeaders = reqEvent.responseHeaders || []
    if (!responseHeaders.some(({ name }) => name === 'Content-Type')) {
      responseHeaders.push({
        name: 'Content-Type',
        value: 'application/javascript; charset=utf-8',
      })
    }
    if (reqEvent.request.url.endsWith('.js')) {
      const responseObj = await client.send('Fetch.getResponseBody', {
        requestId,
      })

      const jsStr = Buffer.from(responseObj.body, 'base64').toString()
      console.log(responseHeaders)
      const ret = `${jsStr}\n//# sourceMappingURL=${reqEvent.request.url.replace('60034', '4173')}.map`
      await client.send('Fetch.fulfillRequest', {
        requestId,
        responseCode: 200,
        responseHeaders,
        body: Buffer.from(ret).toString('base64'),
      })
    }
    else {
      await client.send('Fetch.continueRequest', { requestId })
    }
  })

  await page.goto('http://127.0.0.1:60034/')
})()
