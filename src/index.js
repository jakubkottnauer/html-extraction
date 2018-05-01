// @flow

import $ from 'jquery'
import pipe from 'ramda/es/pipe'
import * as extractionModules from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import { dedup, highlight, popup, entityType } from './modules/postprocessing'
import { getConfig, processConfigPlugins, log } from './utils'
import type {
  Stage1PluginData,
  Stage2Plugin,
  Stage2PluginData,
  Stage3Plugin,
  Value,
} from '../types/plugin'

const { stage1: stage1Config, stage2: stage2Config, stage3: stage3Config } = getConfig()

const main = async () => {
  console.log('Extraction started.')
  const start = +new Date()
  try {
    const dom = $('html')
    const domClone = dom.clone()
    // Temporarily disabled until await in pipe is fixed
    //domClone |> cleanup |> await extract |> postprocess(dom) |> log
    const c = cleanup(domClone)
    const e = await extract(c)
    const extracted = postprocess(dom)(e)
    const end = +new Date()
    const duration = end - start

    const results = { results: extracted, duration }
    log(results)
  } catch (e) {
    console.warn('Error during extraction', e)
  }
}

main().then(() => {
  console.log('Extraction finished.')
})

function cleanup(dom: JQuery) {
  const plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)
  const p = pipe(...plugins)
  return p(dom)
}

async function extract(dom: JQuery) {
  const modules: Array<Stage2Plugin> = Object.values(extractionModules)
  const plugins: Array<Stage2Plugin> = processConfigPlugins(2, modules, stage2Config)

  let results: Array<Value> = []
  for (const p of plugins) {
    try {
      const copiedDOM = dom.clone()
      const start = +new Date()
      const result = await p(copiedDOM)
      const end = +new Date()
      const duration = end - start

      const toAppend: Array<Value> = Array.isArray(result) ? result : [result]
      const withDuration = toAppend.map(r => ({ ...r, duration }))

      results = [...results, ...withDuration]
    } catch (e) {
      console.log('Uncaught exception in extractor.', e)
    }
  }

  return results
}

function postprocess(originalDom: JQuery) {
  return function(results) {
    const plugins: Array<Stage3Plugin> = processConfigPlugins(
      3,
      [entityType, dedup, popup, highlight],
      stage3Config
    )
    const p = pipe(...plugins.map(p => p(originalDom)))
    return p(results)
  }
}
