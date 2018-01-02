// @flow
import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import chalk from 'chalk'
import expected from './expected'

const appendFile = promisify(fs.appendFile)
const readdir = promisify(fs.readdir)
;(async () => {
  const output = 'exp/out.txt'

  await readdir('./dist', async (err, files) => {
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

const diffResultExpected = () => {}

const onConsole = async (msg: { text: string }, file: string, output: string) => {
  const prefix = 'extractlog'
  if (msg.text.startsWith(prefix)) {
    const txtResult = msg.text.split(prefix)[1].trim()
    const jsonResult = JSON.parse(txtResult)
    const diff = diffResultExpected()
    console.log(chalk.bgGreen(file), '\n', jsonResult)
    await appendFile(output, txtResult + '\n')
  }
}

async function testPage(file: string, output: string) {
  console.log(chalk.grey(`${file} starting.`))
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', async msg => {
    await onConsole(msg, file, output)
  })

  await page.goto(`file://${file}`)
  await delay(2000) // Wait for 2 seconds so that all the parsing has enough time to finish.
  console.log(chalk.gray(`${file} done.`))
  await browser.close()
}
