import { dirname, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
import cac from 'cac'
import open from 'open'
import puppeteer from 'puppeteer-core'
import { loadConfig } from 'unconfig'
import fetch from 'node-fetch'
import pkgs from '../package.json'
import { handleBrowser } from './puppeteer'
import { log } from './utils'
import { useReadLine } from './readline'
import type { MizarOptions } from './types'
// import Debug from 'debug'
// const root = process.cwd()

const cli = cac('mizar')
const __dirname = dirname(fileURLToPath(import.meta.url))

const rootConfigPath = resolve(__dirname, '../assets/mizar.ts')
async function getConfig(file: string) {
  return loadConfig<MizarOptions>({
    sources: [
      // load from `my.config.xx`
      {
        files: file,
        // default extensions
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs'],
      },

      // ...
    ],
    // if false, the only the first matched will be loaded
    // if true, all matched will be loaded and deep merged
    merge: false,
  })
}

cli
  .command('open', 'open mizar.config.json to edit')
  .action(() => open(rootConfigPath, { wait: true }).then(() => {
  }))

cli
  .command('run', 'run puppeteer to control browser')
  .alias('')
  .option('-c, --config <config>', 'js/mjs/cjs/ts file that provide config for puppeteer', {
    default: 'mizar',
  })
  .action(async (opts) => {
    useReadLine()

    async function runPuppeteer(config: MizarOptions) {
      try {
        if (!config.fetch)
          config.fetch = {}

        if (!config.fetch.htmlTags)
          config.fetch.htmlTags = []

        config.fetch.htmlTags.push({
          injectTo: 'head-prepend',
          tag: `<script>window.MIZAR_PUPPETEER_STATE=${JSON.stringify(config.inject || {})}</script>`,
        })
        const ret = await fetch(config.url ? new URL(config.url, '/json/version').href : 'http://127.0.0.1:9222/json/version')
        const { webSocketDebuggerUrl } = await ret.json() as any
        const browser = await puppeteer.connect({
          browserWSEndpoint: webSocketDebuggerUrl,
          defaultViewport: {
            width: 0,
            height: 0,
          },
          ...(config.connect || {}),
        })
        await handleBrowser(browser, config)
        log('controlling...')
      }
      catch (e) {
        console.log(e)
      }
    }

    const { config, sources } = await getConfig(opts.config)
    runPuppeteer(config)
    fs.watchFile(sources[0], async () => {
      const { config } = await getConfig(opts.config)
      runPuppeteer(config)
      log('hmr...')
    })
  })

cli.help()
cli.version(pkgs.version)

cli.parse()
