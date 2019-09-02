import store from './store.js'
import xml2js from 'xml2js'
import fallbackData from '../data/communicationads.json'

const getTariffs = () => {
  return new Promise(function (resolve, reject) {
    if (store.get().tariffs.length > 0) {
      resolve()
    }
    const request = new XMLHttpRequest()
    request.open('GET', store.get().endpoint, true)
    request.onreadystatechange = () => {
      if (request.readyState === request.DONE && request.status === 200) {
        convertXMLToJSON(resolve, request.response)
      }
    }
    request.send(null)
  })
}

const convertXMLToJSON = (resolve, xmlData) => {
  try {
    const parser = new xml2js.Parser()

    parser.parseString(xmlData, (error, data) => {
      if (error || !data || !data.handytarif || typeof data.handytarif.product !== 'object') {
        data = fallbackData
      }
      store.set({ tariffs: cleanData(data) })
      resolve()
    })
  } catch (e) {
    resolve()
  }
}

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
