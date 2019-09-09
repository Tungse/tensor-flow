import store from './store.js'

let timerFinished = false

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
    requestXML(resolve)
    setTimerToResolvePromise(resolve)
  })
}

/**
 * resolve promise after 3s if tariffs are requested, else set timerFinished
 * @param resolve
 */
const setTimerToResolvePromise = (resolve) => {
  setTimeout(() => {
    timerFinished = true

    if (store.get().tariffs.length > 0) {
      resolve()
    }
  }, 3000)
}

/**
 * request XML data and convert it to JSON
 */
const requestXML = (resolve) => {
  try {
    const request = new XMLHttpRequest()

    request.open('GET', store.get().endpoint, true)
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200 && request.response) {
        store.set({ tariffs: cleanData(JSON.parse(request.response)) })

        if (timerFinished) {
          resolve()
        }
      }
    }
    request.send()
  } catch (e) {}
}

/**
 * filter only needed keys from XML data
 * @param products
 * @returns {[]}
 */
const cleanData = (products) => {
  let items = []

  if (products && typeof products === 'object') {
    products.forEach((product) => {
      items.push({
        link: product.link, // string like 'http://www.commicationads.net/...'
        product: product.product, // string like 'LTE Internet XL'
        company: product.company, // string like 'PremiumSIM'
        lte: product.mobileweb_lte === 'Ja' || false, // string like 'Ja'
        productInfoUrl: product.url_moreinfo, // string like 'https://www.premiumsim.de/pdf/5158/produktioninformationsblatt'
        flatrate: product.services_phone === 'Flat' || false, // string like 'Flat'
        price: product.cost_pm.replace(',', '.'), // string like '21,99'
        provider: product.provider.toLowerCase(), // string like 'Telefónica'
        volume: product.mobileweb_volume.replace('GB', '').trim(), // string like '8 GB'
      })
    })
  }

  return items
}

export default getTariffs
