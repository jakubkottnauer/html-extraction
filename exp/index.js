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
const inputPath = './build'

const main = async () => {
  const files = (await readdir(inputPath)).filter(file => path.extname(file) === '.html')

  console.log(`Starting up. Processing ${files.length} test files.`)
  const summary = {}
  for (const file of files) {
    await testPage(file, outputPath, s => {
      summary[file] = s
    })
  }

  console.log(summary)
  const csv = summaryToCsv(summary) 
  console.log(csv)
}

main().then(() => {
  console.log('All done.')
})

const summaryToCsv = (summary: Object) => {
  const props = ['entityType', 'name', 'price', 'description']
  const firstLine = `file;${props.join(';')}\n`
  return Object.keys(summary).reduce((acc, k) => {
    return props.reduce((acc2, p) => acc2 + `;${summary[k][p]}`, acc + `${k}`) + '\n'
  }, firstLine)
}

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

  let summary = {}
  const sortedExtractrationResult = extractionResult.sort(
    (a, b) => (a.confidence < b.confidence ? 1 : -1)
  )
  Object.keys(expectedResult).forEach(x => {
    const res = sortedExtractrationResult.find(r => r.key === x)
    if (res) {
      const strValue = res.value ? res.value.toString() : ''
      const areEqual = res.value === expectedResult[x]
      if (areEqual) {
        console.log(chalk.green(`${x}: "${strValue}" === "${expectedResult[x]}".`))
        summary = { ...summary, [res.key]: true }
      } else {
        console.log(chalk.red(`${x}: Expected "${expectedResult[x]}" but got "${strValue}".`))
        summary = { ...summary, [res.key]: false }
      }
    } else {
      console.log(`Property "${x}" not present in ${filename} result.`)
    }
  })
  const keyCount = Object.keys(summary).length
  const correctResultCount = Object.keys(summary).filter(x => summary[x]).length
  console.log(
    `${correctResultCount}/${keyCount} (${correctResultCount * 100 / keyCount} %) correct.`
  )

  return summary
}

const onConsole = async (msg: { text: string }, file: string, output: string) => {
  const prefix = 'extractlog'
  const txt = msg.text()
  if (txt.startsWith(prefix)) {
    const txtResult = txt.split(prefix)[1].trim()
    const jsonResult: Stage3PluginData = JSON.parse(txtResult)
    const summary = diffResultExpected(file, jsonResult)
    await appendFile(output, txtResult + '\n')

    return summary
  }
}

async function testPage(file: string, output: string, onSummary: Function) {
  const absolutePath = path.resolve(__dirname, '..', file)
  console.log(chalk.grey(`${file} starting.`))
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', async msg => {
    const summary = await onConsole(msg, absolutePath, output)
    summary && onSummary(summary)
  })
  page.on('dialog', async dialog => {
    await dialog.dismiss()
  })
  await page.goto(`file://${absolutePath}`)
  await delay(2000) // Wait for 2 seconds so that all the parsing has enough time to finish.
  console.log(chalk.gray(`${file} done.\n`))
  await browser.close()
}
