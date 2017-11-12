import { cleanupString, levenshtein } from '../../utils'

export default function name({ dom, results }) {
  const headings = dom.find('h1')
  if (headings.length === 0) {
    return { dom, results: { ...results, name: 'no name' } }
  }

  if (headings.length === 1) {
    return { dom, results: { ...results, name: cleanupString(headings[0].innerText) } }
  }

  const pageTitle = dom.find('title')[0].innerText

  const titleSeparators = ['|', '-', '–']

  const separated = titleSeparators.map(x => pageTitle.split(x).map(y => cleanupString(y.trim())))

  return { dom, results: { ...results, name: '' } }
}
