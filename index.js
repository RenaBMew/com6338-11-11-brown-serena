const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())
const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)
const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// return string typeof makePoemHTML(poetryResponse)).to.eq('string')
const makePoemHTML = (poemResponse) => {
  const {title, author, lines} = poemResponse[0]
  // convert title to <h2>poemTitle</h2>
  const h2 = makeTag('h2')(title)
  // author name to <h3><em> authorName</em></h3>
  const em = pipe(makeTag('em'), makeTag('h3'))(`by ${author}`)
  const stanzas = lines.join('\n').split('\n\n')
  //  the split, join, and map functions to separate stanzas, insert breaklines
  /*
  Notes:

  const makeStanazs = lines =>
  lines
  .join ('<br/>')
  .split ('<br/><br/>')
  .map(makeTag('p'))
  .join('')

  */
  // each stanza in <p>stanzaLines<br>stanzaLines</p>
  const pStanzas = stanzas.map(stanza => makeTag('p')(stanza.split('\n').join('<br>')))
  const poemHTML = [h2, em, ...pStanzas].join('')

  console.log(poemHTML)
  return poemHTML
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
