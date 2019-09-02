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
    resultProcent: 0, // width of progress-bar
    balance: '0', // how much more € user is paying
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
  const userPrice = parseFloat(formularData.price)
  let userVolume = parseFloat(formularData.volume) || 0
  let initialPrice = userPrice
  let initialVolume = userVolume

  get().tariffs.forEach((tarif) => {
    const tarifPrice = parseFloat(tarif.price)
    const tarifVolume = parseFloat(tarif.volume)

    if (tarifPrice < initialPrice) {
      setDeal('Günstigste Alternative', tarif)
      initialPrice = tarifPrice
      set({
        balance: parseFloat(userPrice - tarifPrice).toFixed(2),
      })
    }
    if (tarif.company === formularData.company && tarifPrice < userPrice) {
      setDeal('Bester Preis im gleichen Netz', tarif)
    }
    if (tarifVolume > initialVolume && tarifPrice < userPrice) {
      setDeal('Bessere Konditionen', tarif)
      initialVolume = tarifVolume
    }
  })

  set({
    checked: true,
    resultCategory: getResultCategory(),
    resultProcent: getResultProzent(),
  })
}

const setDeal = (title, tarif) => {
  const index = getDealIndexByTitle(title)
  const deal = {
    title: title,
    id: tarif.id,
    price: parseFloat(tarif.price).toFixed(2),
    link: tarif.link,
    company: tarif.company,
    options: [],
  }

  if (index > -1) {
    store.deals[index] = deal
  } else {
    store.deals.push(deal)
  }
}

const getDealIndexByTitle = (title) => {
  for (let index in store.deals) {
    if (store.deals[index].title === title) {
      return index
    }
  }

  return -1
}

const getResultCategory = () => {
  if (store.deals.length > 1) {
    return 0
  }
  if (store.deals.length === 1) {
    return 1
  }

  return 2
}

const getResultProzent = () => {
  if (store.deals.length > 1) {
    return 60
  }
  if (store.deals.length === 1) {
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
