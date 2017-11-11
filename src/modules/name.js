import $ from 'sizzle'

export default function name(results) {
  const headings = $('h1')
  if (headings.length === 1) {
    return { ...results, name: headings[0].innerHTML.trim() }
  }

  return results
}
