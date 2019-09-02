import { getDeals, getPriceDiffence } from '../store/deals.js'

let store = {}

const defaultOptions = {
  container: '#smb-phone-plan',
  logo: 'https://www.giga.de/static-local/dist/assets/images/logos/giga.svg',
  endpoint: 'http://tools.communicationads.net/webservice.php?wf=10506&format=xml&calc=handytarif&country=DE',
}

const init = (options) => {
  const settings = Object.assign({}, defaultOptions, options)
  const container = document.querySelector(settings.container)

  if (container === null) {
    throw new Error('container does not exist')
  }

  set({
    deals: [],
    tariffs: [],
    checked: false,
    emailSended: false,
    resultCategory: 0, // 0 = bad, 1 = ok, 2 = good
    resultPercent: 0, // width of progress-bar
    priceDiffence: '0', // how much more € user is paying
    container: container,
    logo: settings.logo,
    endpoint: settings.endpoint,
  })
}

const get = () => {
  return store
}

const set = (action) => {
  store = Object.assign({}, store, action)
}

const setResult = (formularData) => {
  const deals = getDeals(store.tariffs, formularData)

  set({
    deals: deals,
    checked: true,
    priceDiffence: getPriceDiffence(),
    resultCategory: getResultCategory(deals),
    resultPercent: getResultPercent(deals),
  })
}

const getResultCategory = (deals) => {
  if (deals.length > 1) {
    return 0
  }
  if (deals.length === 1) {
    return 1
  }

  return 2
}

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
