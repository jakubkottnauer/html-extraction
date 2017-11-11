import $ from 'sizzle'

export default function price(res) {
  const priceSymbols = ['Kč', ',-', 's DPH', 'bez DPH']

  const priceElements = $('.price')
  priceElements.forEach(e => {
    const inner = e.innerHTML
    const found = priceSymbols.some(x => inner.indexOf(x) != -1)
    if (found && inner.length < 20) {
      console.log(e.innerHTML)
    }
  })

  return { ...res, price: 0 }
}
