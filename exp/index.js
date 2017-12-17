import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
;(async () => {
  const output = 'exp/out.txt'

  await fs.readdir('./dist', async (err, files) => {
    const testFiles = files.filter(file => path.extname(file) === '.html')
    console.log(`Starting up. Processing ${testFiles.length} test files.`)
    for (let file of testFiles) {
      const absolutePath = path.resolve(__dirname, '..', file)
      await testPage(absolutePath, output)
    }
    console.log('All done.')
  })
})()

const delay = (timeout: number) =>
  new Promise((resolve: any) => {
    setTimeout(resolve, timeout)
  })

async function testPage(file, output) {
  console.log(`${file} starting.`)
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', async msg => {
    if (msg.text.startsWith('extractlog')) {
      const txt = msg.text.split('extractlog')[1].trim()
      console.log(file, JSON.parse(txt))
      await fs.appendFile(output, txt + '\n')
    }
  })

  await page.goto(`file://${file}`)
  await delay(2000) // Wait for 2 seconds so that all the parsing has plenty of time to finish.
  console.log(`${file} done.`)
  await browser.close()
}
