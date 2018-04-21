// @flow

export default function getJsonld(dom: JQuery) {
  const tag = dom.find('script[type="application/ld+json"]')[0]
  if (!tag) return null
  const json = JSON.parse(tag.innerHTML)
  console.log(tag.innerHTML)

  return json
}
