import type { Browser, Page } from 'puppeteer'
import { minimatch } from 'minimatch'
import { handleFetch } from './fetch'
import type { Options } from './types'
import { log } from './utils'
export async function handleBrowser(browser: Browser, opts: Options) {
  const { patterns } = opts
  const pages = await browser.pages()

  function isValidUrl(url: string) {
    for (const pattern of patterns) {
      if (minimatch(url, pattern)) {
        log(`control page --${url}`, 'gray')
        return true
      }
    }
  }

  pages.forEach((page) => {
    const url = page.url()
    if (isValidUrl(url))
      handlePage(page, opts)
  })

  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page()
      if (isValidUrl(newPage.url()))
        handlePage(newPage, opts)
    }
  })
}

export async function handlePage(page: Page, opts: Options) {
  await handleFetch(page, opts.fetch || {})
}
