// @flow

import {
  currencyMicro,
  descriptionMeta,
  descriptionMicro,
  nameH1,
  nameJsonld,
  nameMicro,
  nameTitle,
  priceDom,
  priceMicro,
  priceText,
} from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import { dedup } from './modules/result'
import pipe from 'ramda/es/pipe'
import { getConfig, processConfigPlugins, log } from './utils'
import $ from 'jquery'
import type { Stage1PluginData, Stage2Plugin, Stage2PluginData, Value } from '../types/plugin'

const { stage1: stage1Config, stage2: stage2Config, stage3: stage3Config } = getConfig()

try {
  const dom = $('html').clone()
  const stage1Plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)

  // cleanup
  const stage1 = pipe(...stage1Plugins)
  const newDom: JQuery = stage1(dom)

  // extraction
  const stage2Plugins = processConfigPlugins(
    2,
    [
      nameH1,
      nameTitle,
      nameMicro,
      nameJsonld,
      priceDom,
      priceText,
      priceMicro,
      currencyMicro,
      descriptionMicro,
      descriptionMeta,
    ].map((extractor: Stage2Plugin) => (results: Array<Value>) => { 
      const result = extractor(newDom)
      const toAppend = Array.isArray(result) ? result : [result]
      return [...results, ...toAppend]
    }),
    stage2Config
  )
  const stage2 = pipe(...stage2Plugins)
  const emptyResult = []
  const results = stage2(emptyResult)

  log(results)

  // results
  const stage3Plugins = processConfigPlugins(3, [dedup], stage3Config)
  const stage3 = pipe(...stage3Plugins)
  const finalResults: Array<Value> = stage3(results)

  log(finalResults)
} catch (e) {
  console.warn('Error during extraction', e)
}
