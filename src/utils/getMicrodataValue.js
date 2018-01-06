// @flow

import { cleanupString } from './index'
import $ from 'jquery'

export default function getMicrodataValue(dom: Object, field: string) {
  const node = (dom.find(`[itemprop="${field}"]`) || [])[0]
  if (!node) return null
  const jNode = $(node)
  return cleanupString(jNode.attr('content') || node.innerText)
}
