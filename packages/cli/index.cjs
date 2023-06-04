const puppeteer = require('puppeteer')

async function main() {
  // 连接到已经打开的浏览器页面
  const browser = await puppeteer.connect({
    browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/1149662a-49ae-4ff5-bba3-6cddf2c767a1',
    defaultViewport: {
      width: 0,
      height: 0,
    },
  })

  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page()
      console.log(await newPage.url())
      // await newPage.setRequestInterception(true)

      newPage.on('request', async (request) => {
        if (request.url().includes('mizar')) {
          console.log('页面跳转')
          newPage.goto('https://github.com/fgsreally/merak/issues/11')
        }
        // 在这里执行你想要的操作
      })
      // 在新标签页中监听导航请求
    }
  })

  // 创建一个新页面
  const page = await browser.newPage()
  // 监听导航请求

  // 监听页面导航事件，用于在点击链接时在Puppeteer控制的浏览器中打开新页面
  page.on('framenavigated', async (frame) => {
    // 判断导航是否是点击链接触发的
    console.log('在Puppeteer控制的浏览器中打开了一个新页面:', frame.url())

    if (frame.parentFrame() === null)
      console.log('是连接触发的')
      // 在这里可以继续操作新页面
  })

  // 打开链接
  await page.goto('https://linear.app/dipper/issue/DIP-32/replace-mount-method')

  // ... 其他操作
}

main().catch(console.error)
