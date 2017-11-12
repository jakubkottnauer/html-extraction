import { description, name, price } from './modules/extraction'
import { removeBoilerplate, removeSocial } from './modules/cleanup'
import pipe from 'ramda/es/pipe'
import { getConfig } from './utils'
import $ from 'jquery'

const config = getConfig()

try {
  const dom = $('html').clone()

  // cleanup
  const stage1 = pipe(removeBoilerplate, removeSocial)
  const newDom = stage1(dom)

  // extraction
  const stage2 = pipe(name, price, description)
  const { results } = stage2({ dom: newDom, results: {} })

  console.log(results)
} catch (e) {
  console.warn('Error during extraction', e)
}
