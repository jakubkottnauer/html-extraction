// @flow
import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import chalk from 'chalk'
import expected from './expected'
import type { Stage3PluginData } from '../types/plugin'

const appendFile = promisify(fs.appendFile)
const readdir = promisify(fs.readdir)

const outputPath = 'exp/out.txt'
const inputPath = './dist'
;(async () => {
  const files = (await readdir(inputPath)).filter(file => path.extname(file) === '.html')

  console.log(`Starting up. Processing ${files.length} test files.`)
  for (let file of files) {
    const absolutePath = path.resolve(__dirname, '..', file)
    await testPage(absolutePath, outputPath)
  }

  console.log('All done.')
})()

const delay = (timeout: number) =>
  new Promise((resolve: any) => {
    setTimeout(resolve, timeout)
  })

const diffResultExpected = (file: string, extractionResult: Stage3PluginData) => {
  const filename = path.basename(file, path.extname(file)) // removing absolute path and extension
  const expectedResult = expected[filename]

  if (!expectedResult) {
    console.log(chalk.red(`Missing expected result for ${filename}!`))
    return
  }

  const keyCount = Object.keys(expectedResult).length
  let correctResultCount = 0
  Object.keys(expectedResult).forEach(x => {
    const res = extractionResult.find(r => r.key === x)
    if (res) {
      const areEqual = res.value === expectedResult[x]
      if (areEqual) {
        console.log(chalk.green(`${x}: "${res.value}" === "${expectedResult[x]}".`))
        correctResultCount++
      } else {
        console.log(chalk.red(`${x}: Expected "${expectedResult[x]}" but got "${res.value}".`))
      }
    } else {
      console.log(`Property "${x}" not present in ${filename} result.`)
    }
  })
  console.log(
    `${correctResultCount}/${keyCount} (${correctResultCount * 100 / keyCount} %) correct.`
  )
}

const onConsole = async (msg: { text: string }, file: string, output: string) => {
  const prefix = 'extractlog'

  if (msg.text().startsWith(prefix)) {
    const txtResult = msg
      .text()
      .split(prefix)[1]
      .trim()
    const jsonResult: Stage3PluginData = JSON.parse(txtResult)
    const diff = diffResultExpected(file, jsonResult)
    console.log(jsonResult)
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
  console.log(chalk.gray(`${file} done.\n\n`))
  await browser.close()
}
