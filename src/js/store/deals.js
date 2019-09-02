let priceDiffence

export const getPriceDiffence = () => {
  return priceDiffence
}

export const getDeals = (tariffs, formularData) => {
  let deals = []
  const userPrice = parseFloat(formularData.price)
  let userVolume = parseFloat(formularData.volume) || 0
  let initialPrice = userPrice
  let initialVolume = userVolume

  for (let i = 0; i < tariffs.length; i++) {
    const tarif = tariffs[i]
    const tarifPrice = parseFloat(tarif.price)
    const tarifVolume = parseFloat(tarif.volume)

    if (tarifPrice < initialPrice) {
      setDeal('Günstigste Alternative', tarif, deals)
      initialPrice = tarifPrice
      setPriceDiffence(userPrice, tarifPrice)
      continue
    }
    if (tarif.company === formularData.company && tarifPrice < userPrice) {
      setDeal('Bester Preis im gleichen Netz', tarif, deals)
      continue
    }
    if (tarifVolume > initialVolume && tarifPrice < userPrice) {
      setDeal('Bessere Konditionen', tarif, deals)
      initialVolume = tarifVolume
    }
  }

  return deals
}

const setDeal = (title, tarif, deals) => {
  const index = getDealIndexByTitle(deals, title)
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

  return deals
}

const getDealIndexByTitle = (deals, title) => {
  for (let index in deals) {
    if (deals[index].title === title) {
      return index
    }
  }

  return -1
}

const setPriceDiffence = (userPrice, tarifPrice) => {
  priceDiffence = parseFloat(userPrice - tarifPrice).toFixed(2)
}
