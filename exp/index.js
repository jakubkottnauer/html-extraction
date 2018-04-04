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
    await testPage(file, outputPath, (s, duration) => {
      const filename = path.basename(file, path.extname(file)) // removing absolute path and extension
      summary[filename] = {
        correctlyExtracted: s,
        duration,
        filesize: getFilesize(file),
      }
    })
  }

  console.log(summary)
  const csv = summaryToCsv(summary)
  console.log(csv)
  await appendFile(outputPath, csv + '\n')
}

main().then(() => {
  console.log('All done.')
})

const getFilesize = file => {
  const absolutePath = path.resolve(__dirname, '..', file)
  const stats = fs.statSync(absolutePath)
  const fileSizeInBytes = stats.size
  return fileSizeInBytes / 1000.0
}

const props = ['entityType', 'name', 'price', 'description']

// Resulting CSV is in format:
// idx filename correctlyExtracted duration filesize
const summaryToCsv = (summary: Object) =>
  Object.keys(summary)
    .reduce(
      (acc, k) => [
        ...acc,
        { key: k, value: props.filter(p => summary[k]['correctlyExtracted'][p]).length },
      ],
      []
    )
    .sort((a, b) => b.value - a.value)
    .reduce(
      (acc, k, i) =>
        `${acc}${i} "${k.key} (${expected[k.key].entityType})" ${k.value} ${
          summary[k.key].duration
        } ${summary[k.key].filesize}\n`,
      ''
    )

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
  const sortedExtractionResult = extractionResult.sort(
    (a, b) => (a.confidence < b.confidence ? 1 : -1)
  )
  Object.keys(expectedResult).forEach(x => {
    const res = sortedExtractionResult.find(r => r.key === x)
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
  const start = +new Date()
  page.on('console', async msg => {
    const summary = await onConsole(msg, absolutePath, output)
    if (summary) {
      const end = +new Date()
      onSummary(summary, end - start)
    }
  })
  page.on('dialog', async dialog => {
    await dialog.dismiss()
  })
  await page.goto(`file://${absolutePath}`)
  console.log(chalk.gray(`${file} done.\n`))
  await browser.close()
}
