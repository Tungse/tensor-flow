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
  let initialPrice = userPrice

  for (let i = 0; i < tariffs.length; i++) {
    const tarif = tariffs[i]
    const tarifPrice = parseFloat(tarif.price)
    const tarifVolume = parseFloat(tarif.volume)

    if (tarifPrice < initialPrice) {
      setDeal('Günstigste Alternative', tarif)
      initialPrice = tarifPrice
      setPriceDiffence(userPrice, tarifPrice)
      continue
    }
    if (tarif.company === formularData.company && tarifPrice < userPrice) {
      setDeal('Bester Preis im gleichen Netz', tarif)
      continue
    }
    // TODO calculation is not perfect
    if (tarifVolume > initialVolume && tarifPrice < userPrice) {
      setDeal('Bessere Konditionen', tarif)
      initialVolume = tarifVolume
    }
  }

  return deals
}

/**
 * add/update matching deals
 * @param title
 * @param tarif
 */
const setDeal = (title, tarif) => {
  const index = getDealIndexByTitle(title)
  const deal = {
    id: tarif.id,
    title: title,
    link: tarif.link,
    company: tarif.company,
    productInfoUrl: tarif.productInfoUrl,
    price: parseFloat(tarif.price).toFixed(2),
    options: [],
  }

  if (index > -1) {
    deals[index] = deal
  } else {
    deals.push(deal)
  }
}

/**
 * reset deals before each result calculation
 */
export const resetDeals = () => {
  deals = []
}

/**
 * check if deal is already in deals
 * @param title
 * @returns {string|number}
 */
const getDealIndexByTitle = (title) => {
  for (let index in deals) {
    if (deals[index].title === title) {
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
