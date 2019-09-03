import store from './store.js'
import xml2js from 'xml2js'
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
      if (request.readyState === request.DONE && request.status === 200) {
        convertXMLToJSON(request.response)
      }
    }
    request.send()
  } catch (e) {}
}

/**
 * convert XML data to JSON and store it into tariffs
 * @param xmlData
 */
const convertXMLToJSON = (xmlData) => {
  const parser = new xml2js.Parser()

  parser.parseString(xmlData, (error, data) => {
    if (!error && data && data.handytarif && typeof data.handytarif.product !== 'object') {
      store.set({ tariffs: cleanData(data) })
    }
  })
}

/**
 * filter only needed keys from XML data
 * @param data
 * @returns {[]}
 */
const cleanData = (data) => {
  let items = []

  data.handytarif.product.forEach((product) => {
    items.push({
      id: product.product.toString(),
      price: product.cost_pm.toString().replace(',', '.'),
      volume: product.mobileweb_volume.toString().replace('GB', '').trim(),
      company: product.company.toString().toLowerCase(),
      link: product.link.toString(),
      productInfoUrl: product.url_moreinfo.toString(),
      lte: product.mobileweb_lte.toString(),
      phone: product.services_phone.toString(),
      sms: product.services_sms.toString(),
      period: product.contract_period.toString(),
    })
  })

  return items
}

export default getTariffs
