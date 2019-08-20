import getData from './gallery-data.js'
import getReferrer from './referrer.js'
import getInitalPage from './url.js'

/**
 * Return initial state object based on gallery/endcard data
 * @param {Object} options
 */
const getState = (settings) => {
  const state = {}

  state.data = getData(settings.dataSelector)
  state.length = state.data.itemListElement.length
  state.referrer = getReferrer()
  state.currentPage = getInitalPage(state.length)

  return state
}

export default getState
