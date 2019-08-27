import init from '../../src/js/index.js'
import initMobile from '../../src/js/mobile/init.js'
import initDesktop from '../../src/js/desktop/init.js'

jest.mock('../../src/js/mobile/init.js')
jest.mock('../../src/js/desktop/init.js')

describe('Init', () => {
  init({
    device: 'smartphone',
  })

  test('calls mobile init function if device: "mobile" is set', () => {
    expect(initMobile).toBeCalled()
  })

  init({
    device: 'desktop',
  })

  test('calls desktop init function if device: "desktop" is set', () => {
    expect(initDesktop).toBeCalled()
  })
})
