import '../stylesheets/imports.scss'
import * as track from './common/tracking.js'
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
  listenToEnterClick()
  track.embed()
  track.listenToVisibleEvent()
  track.listenToClickEvents()
  try {
  } catch (e) {
    console.error('smb-phone-plan: index.init()', e)
  }
}

const listenToCheckClick = () => {
  const checkButton = document.querySelector('[data-role="smb-phone-plan-check"]')

  checkButton.addEventListener('click', () => {
    calculate()
  })
}

const listenToEnterClick = () => {
  document.onkeydown = (e) => {
    if (e.keyCode === 13) {
      calculate()
    }
  }
}

const calculate = () => {
  // TODO add some validation

  store.set({ deals: [] })
  if (store.get().checked === false) {
    renderProcessing()
  }
  getTariffs().then(() => {
    store.setResult(getFormularData())
    store.set({ checked: true })
  }).then(() => {
    removeProcessing()
    renderResult()
    renderDeals()
  })
}

const getFormularData = () => {
  const companies = document.querySelector('[data-role="smb-phone-plan-companies"]')
  const volume = document.querySelector('[data-role="smb-phone-plan-volume"]')
  const lte = document.querySelector('[data-role="smb-phone-plan-lte"]')
  const price = document.querySelector('[data-role="smb-phone-plan-price"]')
  const flatrate = document.querySelector('[data-role="smb-phone-plan-flatrate"]')

  return {
    company: companies.options[companies.selectedIndex].value,
    volume: volume.options[volume.selectedIndex].value,
    lte: lte.checked,
    price: price.value,
    flatrate: flatrate.checked,
  }
}

export default init
