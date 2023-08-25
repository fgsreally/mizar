import type { Page } from 'puppeteer-core'

export function redirectRequest(urlMap: Record<string, string>) {
  return async (page: Page) => {
    page.setRequestInterception(true)

    page.on('request', (request) => {
      const url = request.url()
      const modifiedUrl = urlMap[url] ?? url
      request.continue({ url: modifiedUrl })
    })
  }
}
