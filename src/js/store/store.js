let store = {}

const defaultOptions = {
  container: '#smb-phone-plan',
  endpoint: 'http://tools.communicationads.net/webservice.php?wf=10506&format=xml&calc=handytarif&country=DE',
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
    ],
    checked: false,
    resultCategory: 0, // 0 = bad, 1 = ok, 2 = good
    resultProcent: 0, // width of progress-bar
    balance: '0', // how much more € user is paying
    emailSended: false,
    container: container,
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
