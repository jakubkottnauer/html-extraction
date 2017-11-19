export default function removeSocial(dom) {
  console.log('REMOVING SOCIAL ICONS')
  dom.find('.socialAndRankPanel').remove() // alza rating and social icons

  return dom
}
