import { cleanupString, getItemProp, levenshtein } from '../../utils'

function getSchemaOrgValue(dom) {
  const description = getItemProp(dom, 'description')
  if (!description) return null

  return {
    description,
  }
}

export default function description({ dom, results }) {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return { dom, results: { ...results, ...metadata } }
  }

  const selectors = ['features', 'detail', 'description']
  selectors.forEach(s => {
    //console.log(dom.find(`[class*='${s}']`))
  })

  return { dom, results: { ...results, description: '' } }
}
