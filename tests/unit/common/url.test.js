import getInitalPage, { getPageFromUrl } from '../../../src/common/url.js'

test('initial-page returns page if available', () => {
  window.history.pushState({ page: 10 }, '', '#page-10')

  expect(getInitalPage(20)).toBe(10)
})

test('initial-page returns page 1 if not available', () => {
  window.history.pushState({ page: 10 }, '', '#page-10')

  expect(getInitalPage(5)).toBe(1)
})

test('returns page number depending on hash #page-xyz', () => {
  window.history.pushState({ page: 10 }, '', '#page-10')

  expect(getPageFromUrl()).toBe(10)
})

test('returns null if no hash defined', () => {
  window.history.pushState({ page: 10 }, '', '')

  expect(getPageFromUrl()).toBe(null)
})
