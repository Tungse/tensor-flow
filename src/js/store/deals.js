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
  let currentVolume = parseFloat(formularData.volume)
  let lowestPrice = userPrice
  let bestPrice = userPrice
  let bestPriceByProvider = userPrice
  const userCondition = {
    lte: formularData.lte,
    flatrate: formularData.flatrate,
    volume: currentVolume,
  }

  for (let i = 0; i < tariffs.length; i++) {
    const tarif = tariffs[i]
    const tarifPrice = parseFloat(tarif.price)
    const tarifVolume = parseFloat(tarif.volume)
    const tarifProvider = getProviderMapping(tarif.provider)
    const tarifCondition = {
      lte: tarif.lte,
      flatrate: tarif.flatrate,
      volume: tarifVolume,
    }
    const condition = getTarifConditionCategory(userCondition, tarifCondition)

    const sameProviderBetterPrice =
      tarifProvider === formularData.provider &&
      (condition === 'same' || condition === 'better') &&
      getTarifPriceCategory(tarifPrice, bestPriceByProvider) === 'better'

    if (sameProviderBetterPrice) {
      setDeal('1:provider', tarif)
      bestPriceByProvider = tarifPrice
      lowestPrice = lowestPrice > tarifPrice ? tarifPrice : lowestPrice
      continue
    }

    const differentProviderBetterPrice =
      tarifProvider !== formularData.provider &&
      (condition === 'same' || condition === 'better') &&
      getTarifPriceCategory(tarifPrice, bestPrice) === 'better'

    if (differentProviderBetterPrice) {
      setDeal('2:price', tarif)
      bestPrice = tarifPrice
      lowestPrice = lowestPrice > tarifPrice ? tarifPrice : lowestPrice
      continue
    }

    const betterConditionSamePrice =
      condition === 'better' &&
      getTarifPriceCategory(tarifPrice, userPrice) === 'same' &&
      tarifVolume >= currentVolume

    if (betterConditionSamePrice) {
      setDeal('3:condition', tarif)
      currentVolume = tarifVolume
      lowestPrice = lowestPrice > tarifPrice ? tarifPrice : lowestPrice
    }
  }

  if (getTarifPriceCategory(lowestPrice, userPrice) === 'better') {
    setPriceDiffence(userPrice, lowestPrice)
  }

  return sortDeals(deals)
}

/**
 * add/update matching deals
 * @param category
 * @param tarif
 */
const setDeal = (category, tarif) => {
  const index = getDealIndexByCategory(category)
  const deal = {
    category: category,
    product: tarif.product,
    company: tarif.company,
    provider: tarif.provider,
    productInfoUrl: tarif.productInfoUrl,
    title: getTitleByDealCategory(category),
    link: `${tarif.link}&subid=tarifchecker`,
    price: parseFloat(tarif.price).toFixed(2),
  }

  if (index > -1) {
    deals[index] = deal
  } else {
    deals.push(deal)
  }
}

/**
 * return title of the deal
 * @param category
 * @returns string
 */
const getTitleByDealCategory = (category) => {
  let title = 'Bester Preis im gleichen Netz'

  if (category === '2:price') {
    title = 'Günstigste Alternative'
  }

  if (category === '3:condition') {
    title = 'Bessere Konditionen zum selben Preis'
  }

  return title
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

/**
 * mapping for o2/telefónica
 * @param provider
 * @returns {string|*}
 */
const getProviderMapping = (provider) => {
  if (provider === 'o2') {
    return 'telefónica'
  }

  return provider
}

/**
 * sort deals by category
 * @param deals
 * @returns {*}
 */
const sortDeals = (deals) => {
  return deals.sort((a, b) => {
    return (a.category < b.category ? -1 : (a.category > b.category ? 1 : 0))
  })
}

/**
 * calculate if tarif's price is better then the current price, with a tolerance limit
 * @param tarifPrice
 * @param price
 * @returns {string}
 */
const getTarifPriceCategory = (tarifPrice, price) => {
  if (tarifPrice > price + parseFloat('0.1')) {
    return 'worse'
  }

  if (tarifPrice < price - parseFloat('0.1')) {
    return 'better'
  }

  return 'same'
}

/**
 * calculate if tarif's condition is better then user's condition
 * @param user
 * @param tarif
 * @returns {string}
 */
const getTarifConditionCategory = (user, tarif) => {
  const worseLte = user.lte && !tarif.lte
  const worseVolume = tarif.volume < user.volume
  const worseFlatrate = user.flatrate && !tarif.flatrate

  if (worseVolume || worseLte || worseFlatrate) {
    return 'worse'
  }

  if (JSON.stringify(user) === JSON.stringify(tarif)) {
    return 'same'
  }

  return 'better'
}
