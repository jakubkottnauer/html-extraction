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
  domClone |> cleanup |> extract |> postprocess(dom) |> log
} catch (e) {
  console.warn('Error during extraction', e)
}

const cleanup = (dom: JQuery) => {
  const plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)
  const p = pipe(...plugins)
  return p(dom)
}

const extract = (dom: JQuery) => {
  const modules: Array<Stage2Plugin> = Object.values(extractionModules)
  const plugins = processConfigPlugins(2, modules, stage2Config)
  const p = pipe(
    ...plugins.map((plugin: Stage2Plugin) => (results: Array<Value>) => {
      const result = plugin(dom)
      const toAppend = Array.isArray(result) ? result : [result]
      return [...results, ...toAppend]
    })
  )

  return p([])
}

const postprocess = (originalDom: JQuery) => {
  return function(results) {
    const plugins = processConfigPlugins(3, [entityType, dedup, popup, highlight], stage3Config)
    const p = pipe(...plugins.map(p => p(originalDom)))
    return p(results)
  }
}
