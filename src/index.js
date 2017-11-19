import { description, name, price } from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import pipe from 'ramda/es/pipe'
import { getConfig, processConfigPlugins } from './utils'
import $ from 'jquery'

const { stage1: stage1Config, stage2: stage2Config } = getConfig()

try {
  const dom = $('html') //.clone()
  const stage1Plugins = processConfigPlugins(1, [removeBoilerplate, removeSocial], stage1Config)

  // cleanup
  const stage1 = pipe(...stage1Plugins)
  const newDom = stage1(dom)

  // extraction
  const stage2Plugins = processConfigPlugins(2, [name, price, description], stage2Config)
  const stage2 = pipe(...stage2Plugins)
  const { results } = stage2({ dom: newDom, results: {} })

  // output
  console.log(results)
} catch (e) {
  console.warn('Error during extraction', e)
}
