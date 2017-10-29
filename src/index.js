import $ from 'sizzle'

const headings = $('h1')
if (headings.length === 1) {
  console.log('Product title is ' + headings[0].innerHTML.trim())
}

const priceSymbols = ['Kč', ',-', 's DPH', 'bez DPH']

const priceElements = $('.price')
priceElements.forEach(e => {
  const inner = e.innerHTML
  const found = priceSymbols.some(x => inner.indexOf(x) != -1)
  if (found && inner.length < 20) {
    console.log(e.innerHTML)
  }
})
