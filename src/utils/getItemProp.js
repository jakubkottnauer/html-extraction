import { cleanupString } from './index'
import $ from 'jquery'

export default function getItemProp(dom, field) {
  const node = dom.find(`[itemprop="${field}"]` || [])[0]
  if (!node) return undefined
  const jNode = $(node)
  return cleanupString(jNode.attr('content') || node.innerText)
}
