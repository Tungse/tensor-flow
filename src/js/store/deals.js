let deals
let priceDiffence

/**
 * return the difference of user input price and the lowest price from XML data
 * @returns {*}
 */
export const getPriceDiffence = () => {
  return priceDiffence.replace('.', ',')
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
  const userCondition = {
    lte: formularData.lte,
    flatrate: formularData.flatrate,
    volume: initialVolume,
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

    const sameProviderSameConditionLowestPrice = tarifProvider === formularData.provider && condition === 'same' && getTarifPriceCategory(tarifPrice, lowestPriceByProvider) === 'better'
    if (sameProviderSameConditionLowestPrice) {
      setDeal('0_provider', tarif)
      lowestPriceByProvider = tarifPrice
      continue
    }

    const differentProviderSameConditionLowestPrice = tarifProvider !== formularData.provider && condition === 'same' && getTarifPriceCategory(tarifPrice, lowestPrice) === 'better'
    if (differentProviderSameConditionLowestPrice) {
      setDeal('1_price', tarif)
      lowestPrice = tarifPrice
      continue
    }

    const betterConditionSamePrice = condition === 'better' && getTarifPriceCategory(tarifPrice, userPrice) === 'same' && tarifVolume >= initialVolume
    if (betterConditionSamePrice) {
      setDeal('2_condition', tarif)
      initialVolume = tarifVolume
    }
  }

  setPriceDiffence(userPrice, lowestPrice)

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
    link: tarif.link,
    category: category,
    product: tarif.product,
    company: tarif.company,
    provider: tarif.provider,
    productInfoUrl: tarif.productInfoUrl,
    title: getTitleByDealCategory(category),
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

  if (category === '1_price') {
    title = 'Günstigste Alternative'
  }

  if (category === '2_condition') {
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
  if (tarifPrice > price) {
    return 'worse'
  }

  if (tarifPrice === price) {
    return 'same'
  }

  return 'better'
}

/**
 * calculate if tarif's condition is better then user's condition
 * @param user
 * @param tarif
 * @returns {string}
 */
const getTarifConditionCategory = (user, tarif) => {
  const worseLte = user.lte === true && tarif.lte !== 'Ja'
  const worseFlatrate = user.flatrate === true && tarif.flatrate !== 'Flat'
  const sameLte = (user.lte === true && tarif.lte === 'Ja') || (user.lte === false && tarif.lte !== 'Ja')
  const sameFlatrate = (user.flatrate === true && tarif.flatrate === 'Flat') || (user.flatrate === false && tarif.flatrate !== 'Flat')

  if (tarif.volume < user.volume || worseLte || worseFlatrate) {
    return 'worse'
  }

  if (tarif.volume === user.volume && sameLte && sameFlatrate) {
    return 'same'
  }

  return 'better'
}
