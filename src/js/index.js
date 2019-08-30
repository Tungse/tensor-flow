import '../stylesheets/imports.scss'
import store from './store/store.js'
import getTariffs from './store/tariffs.js'
import renderStage from './render/stage.js'
import {renderProcessing, removeProcessing} from './render/processing.js'
import renderResult from './render/result.js'
import renderDeals from './render/deals.js'

if (process.env.NODE_ENV === 'development') {
  import('../stylesheets/demo.scss')
}

const init = (options) => {
  store.init(options)
  renderStage()
  listenToCheckClick()
  try {
  } catch (e) {
    console.error('smb-phone-plan: index.init()', e)
  }
}

const listenToCheckClick = () => {
  const checkButton = document.querySelector('[data-role="smb-phone-plan-check"]')

  checkButton.addEventListener('click', () => {
    const formularData = getFormularData()

    if (store.get().checked === false) {
      renderProcessing()
    }
    getTariffs().then(() => {
      store.setResult(formularData)
      store.set({ checked: true })
    }).then(() => {
      removeProcessing()
      renderResult()
      renderDeals()
    })
  })
}

const getFormularData = () => {
  const provider = document.querySelector('[data-role="smb-phone-plan-providers"]')
  const volume = document.querySelector('[data-role="smb-phone-plan-volume"]')
  const lte = document.querySelector('[data-role="smb-phone-plan-lte"]')
  const price = document.querySelector('[data-role="smb-phone-plan-price"]')
  const flatrate = document.querySelector('[data-role="smb-phone-plan-flatrate"]')

  return {
    provider: provider.options[provider.selectedIndex].value,
    volume: volume.options[volume.selectedIndex].value,
    lte: lte.checked,
    price: price.value,
    flatrate: flatrate.checked,
  }
}

export default init
