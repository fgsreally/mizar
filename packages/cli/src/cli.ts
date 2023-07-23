/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import { dirname, resolve } from 'path'
import cac from 'cac'
import open from 'open'
import puppeteer from 'puppeteer'
import pkgs from '../package.json'
import { handleBrowser } from './puppeteer'
import { log } from './utils'
import { fileURLToPath } from 'node:url'
import { loadConfig } from 'unconfig'
import fetch from 'node-fetch'
import type {Options} from './types'
const cli = cac('mizar')
const root = process.cwd()
const __dirname = dirname(fileURLToPath(import.meta.url))

const rootConfigPath=resolve(__dirname,'../assets/mizar.config.json')
async function getConfig(file:string) {
  const { config, } = await loadConfig({
    sources: [
      // load from `my.config.xx`
      {
        files: file,
        // default extensions
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', ],
      },
  
      // ...
    ],
    // if false, the only the first matched will be loaded
    // if true, all matched will be loaded and deep merged
    merge: false,
  }) 

  return config
}



  cli
  .command('open', 'open mizar.config.json to edit')
  .action(()=>open(rootConfigPath,{wait:true}).then(()=>{
  }))  

cli
  .command('run', 'run puppeteer to control browser')
  .alias('')
  .option('-c, --config', 'js/mjs/cjs/ts file that provide config for puppeteer', {
    default: 'mizar',
  })
  .action(async (opts) => {

    try{
      const config = await getConfig(opts.file) as Options

    if (!config.url) {
      log(`miss \`url\` in ${opts.file}`, 'red')
      process.exit(1)
    }

    const ret=await fetch(config.url||'http://localhost:9222/json/version')
const {webSocketDebuggerUrl}=await ret.json() as any
    const browser = await puppeteer.connect({
      browserWSEndpoint: webSocketDebuggerUrl,
      defaultViewport: {
        width: 0,
        height: 0,
      },
      ...(config.connect || {}),
    })
  await  handleBrowser(browser, config)
  console.log('start server!')
    }catch(e){
      console.log(e)
    }
    
  })

cli.help()
cli.version(pkgs.version)

cli.parse()
