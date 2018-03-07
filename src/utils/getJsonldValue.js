// @flow

import { cleanupString } from './index'

export default function getJsonldValue(dom: JQuery, field: string) {
  const tag = dom.find('script[type="application/ld+json"]')[0]
  if (!tag) return null
  const json = JSON.parse(tag)
  return cleanupString(json[field])
}
