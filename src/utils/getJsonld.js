// @flow
import { entityTypes } from '../constants'

export default function getJsonld(dom: JQuery) {
  const tags = dom.find('script[type="application/ld+json"]')

  if (!tags.length) return null
  let tag = tags[0]

  // If there are several JSON-LD annotation available, try to find
  if (tags.length > 1) {
    tag = tags.toArray().find(t => {
      if (!t.innerHTML) return false
      const parsed = JSON.parse(t.innerHTML)
      return !!entityTypes[(parsed['@type'] || '').toLowerCase()]
    }) || tag
  }

  const json = JSON.parse(tag.innerHTML)
  return json
}
