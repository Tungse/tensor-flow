let store = {}
let history = []

const defaultOptions = {
  container: '#smb-phone-plan',
}

const init = (options) => {
  const settings = Object.assign({}, defaultOptions, options)
  const container = document.querySelector(settings.container)

  if (container === null) {
    throw new Error('container does not exist')
  }

  set({
    tariffs: [],
    deals: [
      {
        title: 'Günstigste Alternative',
        id: 'O2 Free S',
        price: '5.99€',
        options: [
          '+++ Datenvolumen',
          '++ Netzabdeckung',
        ],
      },
      {
        title: 'Bester Preis im gleichen Netz',
        id: 'Super Tarif',
        price: '6.99€',
        options: [
          '+++ Datenvolumen',
          '++ Telefon Flatrate',
        ],
      },
      {
        title: 'Bessere Konditionen zum gleichen Preis',
        id: 'O2 Free Unlimited',
        price: '2.99€',
        options: [
          '+++ Datenvolumen',
        ],
      },
    ],
    checked: false,
    resultCategory: 0, // 0 = bad, 1 = ok, 2 = good
    resultProcent: 0, // width of progress-bar
    balance: '0', // how much more € user is paying
    emailSended: false,
    container: container,
  })
}

const get = () => {
  return store
}

const set = (action) => {
  store = Object.assign({}, store, action)
  history.push(store)
}

const setResult = (formularData) => {
  // TODO result calculation
  set({
    checked: true,
    balance: '5,90',
    resultCategory: 0,
    resultProcent: 80,
  })
}

export default {
  get,
  set,
  init,
  setResult,
}
