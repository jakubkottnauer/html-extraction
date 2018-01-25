// @flow

import { cleanupString } from './index'
import $ from 'jquery'

export default function getMetaValue(dom: JQuery, field: string) {
  const node = dom.find(`meta[name="${field}"]`)[0] || dom.find(`meta[property="${field}"]`)[0]
  if (!node) return null
  const jNode = $(node)
  return cleanupString(jNode.attr('content') || node.innerText)
}
