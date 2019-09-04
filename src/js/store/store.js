import { getDeals, resetDeals, getPriceDiffence } from '../store/deals.js'

let store = {}

const defaultOptions = {
  container: '#smb-phone-plan',
  logo: 'https://www.giga.de/static-local/dist/assets/images/logos/giga.svg',
  endpoint: 'https://tools.communicationads.net/webservice.php?wf=10506&format=xml&calc=handytarif&country=DE',
}

/**
 * init store with default options
 * @param options
 */
const init = (options) => {
  const settings = Object.assign({}, defaultOptions, options)

  set({
    deals: [],
    tariffs: [],
    calculated: false,
    emailSended: false,
    resultCategory: 0, // 0 = bad, 1 = bad, 2 = good
    resultPercent: 0, // width of progress-bar
    priceDiffence: '0', // how much more € user is paying
    logo: settings.logo,
    endpoint: settings.endpoint,
    container: document.querySelector(settings.container),
  })
}

/**
 * return store object
 */
const get = () => {
  return store
}

/**
 * set store
 * @param action
 */
const set = (action) => {
  store = Object.assign({}, store, action)
}

/**
 * calculate user result and get matching deals
 * @param formularData
 */
const setResult = (formularData) => {
  resetDeals()

  const deals = getDeals(store.tariffs, formularData)

  set({
    deals: deals,
    calculated: true,
    priceDiffence: getPriceDiffence(),
    resultCategory: getResultCategory(deals),
    resultPercent: getResultPercent(deals),
  })
}

/**
 * calculate user result category by the among of matching deals
 * @param deals
 * @returns {number}
 */
const getResultCategory = (deals) => {
  if (deals.length > 1) {
    return 0
  }
  if (deals.length === 1) {
    return 1
  }

  return 2
}

/**
 * calculate user progress bar percent by the among of matching deals
 * @param deals
 * @returns {number}
 */
const getResultPercent = (deals) => {
  if (deals.length > 1) {
    return 60
  }
  if (deals.length === 1) {
    return 80
  }

  return 90
}

export default {
  get,
  set,
  init,
  setResult,
}
