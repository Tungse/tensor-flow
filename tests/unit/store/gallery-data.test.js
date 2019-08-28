import getData from '../../../src/js/store/gallery-data.js'

test('getData reads data from document json-ld', () => {
  const testCases = [
    {
      innerHTML: `<script type="application/ld+json" id="data">  </script>`,
      expected: () => {
        expect(() => {
          getData('#data')
        }).toThrow('data is empty')
      },
    },
    {
      innerHTML: `<script type="application/ld+json" id="some-data">
          {
            "@context": "http://schema.org",
          }
        </script>`,
      expected: () => {
        expect(() => {
          getData('#data')
        }).toThrow('data element not found')
      },
    },
    {
      innerHTML: `<script type="application/ld+json" id="data">
          {
            "@context": "http://schema.org",
            "@type": "ItemList",
            "numberOfItems": 4,
            "itemListElement": []
          }
        </script>`,
      expected: () => {
        expect(getData('#data')).toEqual({
          '@context': 'http://schema.org',
          '@type': 'ItemList',
          'numberOfItems': 4,
          'itemListElement': [],
        })
      },
    },
  ]

  for (let testCase of testCases) {
    document.body.innerHTML = testCase.innerHTML
    testCase.expected()
  }
})
