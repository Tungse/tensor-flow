import init from '../../src/js/index.js'
import initMobile from '../../src/js/mobile/init.js'
import initDesktop from '../../src/js/desktop/init.js'

jest.mock('../../src/js/mobile/init.js')
jest.mock('../../src/js/desktop/init.js')

describe('Init', () => {
  init({
    device: 'smartphone',
  })

  it('calls mobile init function if device: "mobile" is set', () => {
    test.only('init function is available', () => {
      expect(initMobile).toBeCalled()
    })
  })

  init({
    device: 'smartphone',
  })

  it('calls mobile init function if device: "desktop" is set', () => {
    test.only('init function is available', () => {
      expect(initDesktop).toBeCalled()
    })
  })
})
