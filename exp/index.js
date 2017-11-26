import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
;(async () => {
  fs.readdir('./dist', (err, files) => {
    files.filter(file => path.extname(file) === '.html').forEach(async file => {
      const absolutePath = path.resolve(__dirname, '..', file)
      await testPage(absolutePath)
    })
  })
})()

async function testPage(file) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', msg => {
    if (msg.text.startsWith('extractlog')) {
      console.log(file, JSON.parse(msg.text.split('extractlog')[1].trim()))
    }
  })

  await page.goto(`file://${file}`)

  await browser.close()
}
