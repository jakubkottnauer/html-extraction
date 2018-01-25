// @flow

import $ from 'jquery'
import pipe from 'ramda/es/pipe'
import * as extractionModules from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import { dedup, highlight, popup, entityType } from './modules/postprocessing'
import { getConfig, processConfigPlugins, log } from './utils'
import type { Stage1PluginData, Stage2Plugin, Stage2PluginData, Value } from '../types/plugin'

const { stage1: stage1Config, stage2: stage2Config, stage3: stage3Config } = getConfig()

try {
  const dom = $('html')
  const domClone = dom.clone()

  const run = pipe(cleanup, extract, postprocess(dom), log)
  run(domClone)
} catch (e) {
  console.warn('Error during extraction', e)
}

function cleanup(dom: JQuery) {
  const plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)
  const p = pipe(...plugins)
  return p(dom)
}

function extract(dom: JQuery) {
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

function postprocess(originalDom: JQuery) {
  return function(results) {
    const plugins = processConfigPlugins(
      3,
      [entityType, dedup, popup(originalDom), highlight(originalDom)],
      stage3Config
    )
    const p = pipe(...plugins)
    return p(results)
  }
}
