import getData from '../../../src/common/gallery-data.js'

test('getData reads data from document json-ld', () => {
  document.body.innerHTML = `
  <script type="application/ld+json" id="data">
    {
      "@context": "http://schema.org",
      "@type": "ItemList",
      "numberOfItems": 4,
      "itemListElement": []
    }
  `

  expect(getData('#data')).toEqual({
    '@context': 'http://schema.org',
    '@type': 'ItemList',
    'numberOfItems': 4,
    'itemListElement': [],
  })
})
