// @flow

import * as extractionModules from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import { dedup } from './modules/result'
import pipe from 'ramda/es/pipe'
import { getConfig, processConfigPlugins, log } from './utils'
import $ from 'jquery'
import type { Stage1PluginData, Stage2Plugin, Stage2PluginData, Value } from '../types/plugin'

const { stage1: stage1Config, stage2: stage2Config, stage3: stage3Config } = getConfig()

try {
  const dom = $('html')
  const domClone = dom.clone()

  const run = pipe(runStage1, runStage2, log, runStage3(dom), log)
  run(domClone)
} catch (e) {
  console.warn('Error during extraction', e)
}

// Cleanup
function runStage1(dom: JQuery) {
  const plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)
  const p = pipe(...plugins)
  return p(dom)
}

// Extraction
function runStage2(dom: JQuery) {
  const plugins = processConfigPlugins(2, Object.values(extractionModules), stage2Config)
  const p = pipe(
    ...plugins.map((extractor: Stage2Plugin) => (results: Array<Value>) => {
      const result = extractor(dom)
      const toAppend = Array.isArray(result) ? result : [result]
      return [...results, ...toAppend]
    })
  )

  return p([])
}

// Postprocessing
function runStage3(originalDom) {
  return function(results) {
    const plugins = processConfigPlugins(3, [dedup], stage3Config)
    const p = pipe(...plugins)
    return p(results)
  }
}
