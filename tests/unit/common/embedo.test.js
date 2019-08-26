import { initEmbedo, embedoInst } from '../../../src/js/common/embedo.js'

test('embedo gets instanciated', () => {
  expect(embedoInst).toBe(null)

  initEmbedo()

  expect(typeof embedoInst).toBe('object')
})
