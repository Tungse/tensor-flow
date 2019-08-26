import getReferrer from '../../../src/js/common/referrer.js'

beforeAll(() => {
  global.window.smbContext = {
    content: {
      id: null,
    },
  }
})

test('returns referrer if internal referrer', () => {
  const testCases = [
    {
      smbContextId: 111,
      viaId: undefined,
      expected: null,
    },
    {
      smbContextId: 111,
      viaId: 123,
      expected: null,
    },
    {
      smbContextId: 123,
      viaId: 123,
      expected: 'https://www.example.com/',
    },
  ]

  Object.defineProperty(window.document, 'referrer', {
    value: 'https://www.example.com/',
    configurable: true,
  })
  for (let testCase of testCases) {
    global.window.sessionStorage.setItem('smb_via', JSON.stringify({targetId: testCase.viaId}))
    global.window.smbContext.content.id = testCase.smbContextId
    expect(getReferrer()).toBe(testCase.expected)
  }
})
