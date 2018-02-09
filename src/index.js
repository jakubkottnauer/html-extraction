// @flow

import $ from 'jquery'
import pipe from 'ramda/es/pipe'
import pipeP from 'ramda/es/pipeP'
import * as extractionModules from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import { dedup, highlight, popup, entityType } from './modules/postprocessing'
import { getConfig, processConfigPlugins, log } from './utils'
import type { Stage1PluginData, Stage2Plugin, Stage2PluginData, Value } from '../types/plugin'

const { stage1: stage1Config, stage2: stage2Config, stage3: stage3Config } = getConfig()

const main = async () => {
  try {
    const dom = $('html')
    const domClone = dom.clone()
    //domClone |> cleanup |> extract |> postprocess(dom) |> log
    const c = cleanup(domClone)
    console.log('cleanupDone')
    const e = await extract(c)
    console.log('extractDone')
    const x = postprocess(dom)(e)
    console.log('postprocessDone')
    log(x)
  } catch (e) {
    console.warn('Error during extraction', e)
  }
}

main().then(() => {
  console.log('All done.')
})

function cleanup(dom: JQuery) {
  const plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)
  const p = pipe(...plugins)
  return p(dom)
}

async function extract(dom: JQuery) {
  const modules: Array<Stage2Plugin> = Object.values(extractionModules)
  const plugins = processConfigPlugins(2, modules, stage2Config)
  console.log(plugins)
  /*const p = pipeP(
    ...plugins.map((plugin: Stage2Plugin) => async (results: Array<Value>) => {
      const result = await plugin(dom)
      console.log(result)
      const toAppend = Array.isArray(result) ? result : [result]
      return Promise.resolve([...results, ...toAppend])
    })
  )*/

  let results = []
  for (let p in plugins) {
    try {
      const result = await plugins[p](dom)
      const toAppend = Array.isArray(result) ? result : [result]
      results = [...results, ...toAppend]
    } catch (e) {
      console.log('Uncaught exception in extractor.')
    }
  }
  console.log('RETURNING FROM EXTRACTION')
  //console.log(p.then)
  return results
}

function postprocess(originalDom: JQuery) {
  return function(results) {
    const plugins = processConfigPlugins(3, [entityType, dedup, popup, highlight], stage3Config)
    const p = pipe(...plugins.map(p => p(originalDom)))
    return p(results)
  }
}
