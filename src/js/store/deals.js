let deals
let priceDiffence

/**
 * return the difference of user input price and the lowest price from XML data
 * @returns {*}
 */
export const getPriceDiffence = () => {
  return priceDiffence
}

/**
 * return matching deals by calculating user inputs
 * @param tariffs
 * @param formularData
 * @returns {*}
 */
export const getDeals = (tariffs, formularData) => {
  const userPrice = parseFloat(formularData.price)
  let initialVolume = parseFloat(formularData.volume)
  let lowestPrice = userPrice
  let lowestPriceByProvider = userPrice
  let lowestPriceByVolume = userPrice

  for (let i = 0; i < tariffs.length; i++) {
    const tarif = tariffs[i]
    const tarifPrice = parseFloat(tarif.price)
    const tarifVolume = parseFloat(tarif.volume)

    if (tarifPrice < lowestPrice) {
      setDeal('price', tarif)
      lowestPrice = tarifPrice
      continue
    }
    if (tarif.provider === formularData.provider && tarifPrice < lowestPriceByProvider) {
      setDeal('provider', tarif)
      lowestPriceByProvider = tarifPrice
      continue
    }
    if (tarifVolume > initialVolume && tarifPrice < lowestPriceByVolume) {
      setDeal('condition', tarif)
      lowestPriceByVolume = tarifPrice
      initialVolume = tarifVolume
    }
  }

  setPriceDiffence(userPrice, lowestPrice)

  return deals
}

/**
 * add/update matching deals
 * @param category
 * @param tarif
 */
const setDeal = (category, tarif) => {
  const texts = getTextsByDealCategory(category, tarif)
  const index = getDealIndexByCategory(category)
  const deal = {
    link: tarif.link,
    category: category,
    title: texts.title,
    product: tarif.product,
    company: tarif.company,
    provider: tarif.provider,
    description: texts.description,
    productInfoUrl: tarif.productInfoUrl,
    price: parseFloat(tarif.price).toFixed(2),
  }

  if (index > -1) {
    deals[index] = deal
  } else {
    deals.push(deal)
  }
}

/**
 * return title and description of the deal
 * @param category
 * @param tarif
 * @returns {{description: string, title: string}}
 */
const getTextsByDealCategory = (category, tarif) => {
  let texts = {
    title: 'Günstigste Alternative',
    description: `Hier kann Beschreibungstext für die günstigste Alternative stehen, mit link zum Datenblatt für den Tarif ${tarif.product}`,
  }

  if (category === 'provider') {
    texts.title = 'Bester Preis im gleichen Netz'
    texts.description = `Hier kann Beschreibungstext für den bester Preis im gleichen Netz stehen, mit link zum Datenblatt für den Tarif ${tarif.product}`
  }

  if (category === 'condition') {
    texts.title = 'Bessere Konditionen'
    texts.description = `Hier kann Beschreibungstext für die bessere Konditionen stehen, mit link zum Datenblatt für den Tarif ${tarif.product}`
  }

  return texts
}

/**
 * reset deals before each result calculation
 */
export const resetDeals = () => {
  deals = []
}

/**
 * check if deal is already in deals
 * @param category
 * @returns {string|number}
 */
const getDealIndexByCategory = (category) => {
  for (let index in deals) {
    if (deals[index].category === category) {
      return index
    }
  }

  return -1
}

/**
 * calculate difference of user input price and price from XML data
 * @param userPrice
 * @param tarifPrice
 */
const setPriceDiffence = (userPrice, tarifPrice) => {
  priceDiffence = parseFloat(userPrice - tarifPrice).toFixed(2)
}
