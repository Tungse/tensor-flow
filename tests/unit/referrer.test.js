import getReferrer from '../../src/common/referrer.js'

test('returns referrer if internal referrer', () => {
  Object.defineProperty(window.document, 'referrer', {
    value: 'https://www.example.com/',
    configurable: true,
  })

  expect(getReferrer()).toBe('https://www.example.com/')
})

test('returns referrer if internal referrer', () => {
  Object.defineProperty(window.document, 'referrer', {
    value: 'https://www.external.com/',
  })

  expect(getReferrer()).toBe(null)
})
