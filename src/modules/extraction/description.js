import { cleanupString, levenshtein } from '../../utils'

export default function description({ dom, results }) {
  const selectors = ['features', 'detail', 'description']
  selectors.forEach(s => {
    //console.log(dom.find(`[class*='${s}']`))
  })

  return { dom, results: { ...results, description: '' } }
}
