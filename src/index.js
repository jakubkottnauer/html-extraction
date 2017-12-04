// @flow

import { description, nameH1, nameMeta, nameTitle, price, currency } from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import { dedup } from './modules/result'
import pipe from 'ramda/es/pipe'
import { getConfig, processConfigPlugins, log } from './utils'
import $ from 'jquery'
import type { Stage2PluginData } from '../types/plugin'

const { stage1: stage1Config, stage2: stage2Config, stage3: stage3Config } = getConfig()

try {
  const dom = $('html').clone()
  const stage1Plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)

  // cleanup
  const stage1 = pipe(...stage1Plugins)
  const newDom = stage1(dom)

  // extraction
  const stage2Plugins = processConfigPlugins(
    2,
    [nameH1, nameTitle, nameMeta, price, currency, description],
    stage2Config
  )
  const stage2 = pipe(...stage2Plugins)
  const emptyResult: Stage2PluginData = { dom: newDom, results: [] }
  const { results } = stage2(emptyResult)

  log(results)

  // results
  const stage3Plugins = processConfigPlugins(3, [dedup], stage3Config)
  const stage3 = pipe(...stage3Plugins)
  const finalResults = stage3(results)

  log(finalResults)
} catch (e) {
  console.warn('Error during extraction', e)
}
