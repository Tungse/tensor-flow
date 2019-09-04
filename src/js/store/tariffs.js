import store from './store.js'
import xmlParser from 'fast-xml-parser'
import fallbackData from '../data/communicationads.json'

/**
 * request XML data from API and set tariffs in store
 * @returns {Promise}
 */
const getTariffs = () => {
  return new Promise(function (resolve, reject) {
    if (store.get().calculated) {
      resolve()
      return
    }
    requestXML()
    setTimerToResolvePromise(resolve)
  })
}

/**
 * use fallback data if needed and resolve promise after 3s
 * @param resolve
 */
const setTimerToResolvePromise = (resolve) => {
  setTimeout(() => {
    if (store.get().tariffs.length === 0) {
      store.set({ tariffs: cleanData(fallbackData) })
    }

    resolve()
  }, 3000)
}

/**
 * request XML data and convert it to JSON
 */
const requestXML = () => {
  try {
    const request = new XMLHttpRequest()

    request.open('GET', store.get().endpoint, true)
    request.timeout = 2500
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200 && request.response) {
        const data = xmlParser.parse(request.response)
        store.set({ tariffs: cleanData(data) })
      }
    }
    request.send()
  } catch (e) {}
}

/**
 * filter only needed keys from XML data
 * @param data
 * @returns {[]}
 */
const cleanData = (data) => {
  let items = []

  if (data && data.handytarif && typeof data.handytarif.product === 'object') {
    data.handytarif.product.forEach((product) => {
      items.push({
        link: product.link.toString(),
        id: product.product.toString(),
        productInfoUrl: product.url_moreinfo.toString(),
        company: product.company.toString().toLowerCase(),
        provider: product.provider.toString().toLowerCase(),
        price: product.cost_pm.toString().replace(',', '.'),
        volume: product.mobileweb_volume.toString().replace('GB', '').trim(),
      })
    })
  }

  return items
}

export default getTariffs
