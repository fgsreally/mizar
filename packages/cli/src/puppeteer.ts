import type { Browser, Page } from 'puppeteer-core'
import { minimatch } from 'minimatch'
import Debug from 'debug'
import { handleFetch } from './fetch'
import type { MizarOptions } from './types'
import { log } from './utils'
const debug = Debug('mizar:page')
export async function handleBrowser(browser: Browser, opts: MizarOptions) {
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
    page.on('framenavigated', (e) => {
      const url = e.url()
      if (isValidUrl(e.url())) {
        handlePage(page, opts)
        debug(`control page '${url}' by navigated event`)
      }
    })
    if (isValidUrl(url)) {
      handlePage(page, opts)
      debug(`control page '${url}' by initialization`)
    }
  })

  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page()
      const url = newPage.url()
      if (isValidUrl(url)) {
        handlePage(newPage, opts)
        debug(`control page '${url}' by targetcreated event`)
      }
    }
  })
}

export async function handlePage(page: Page, opts: MizarOptions) {
  await handleFetch(page, opts.fetch || {})
}
