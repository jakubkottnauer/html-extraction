const headings = document.getElementsByTagName('h1')
if (headings.length === 1) {
  console.log('Product title is ' + headings[0].innerHTML.trim())
}

