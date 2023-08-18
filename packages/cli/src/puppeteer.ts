import type { Browser, Page } from 'puppeteer-core'
import { minimatch } from 'minimatch'
import Debug from 'debug'
import { handleFetch } from './fetch'
import type { MizarOptions } from './types'
import { log } from './utils'

const debug = Debug('mizar:page')

const pageSet = new Set<Page>()// page can't be handle twice

export async function handleBrowser(browser: Browser, opts: MizarOptions) {
  pageSet.clear()
  const { patterns } = opts

  const pages = await browser.pages()

  function isValidUrl(url: string) {
    for (const pattern of patterns) {
      if (minimatch(url, pattern))
        return true
    }
  }

  pages.forEach(async (page) => {
    const url = page.url()
    page.on('framenavigated', async (e) => {
      const url = e.url()
      if (isValidUrl(e.url())) {
        if (await handlePage(page, opts))
          debug(`control page '${url}' by navigated event`)
      }
    })
    if (isValidUrl(url)) {
      if (await handlePage(page, opts))
        debug(`control page '${url}' by initialization`)
    }
  })

  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page()
      const url = newPage.url()
      if (isValidUrl(url)) {
        if (await handlePage(newPage, opts))
          debug(`control page '${url}' by targetcreated event`)
      }
    }
  })
}

export async function handlePage(page: Page, opts: MizarOptions) {
  if (pageSet.has(page))
    return false
  pageSet.add(page)
  page.on('close', () => {
    pageSet.delete(page)
  })
  await handleFetch(page, opts.fetch || {})
  log(`control page --${page.url()} (total:${pageSet.size})`, 'gray')

  return true
}
