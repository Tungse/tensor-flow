import '../stylesheets/imports.scss'
import * as track from './common/tracking.js'
import validateFormularData from './common/validation.js'
import store from './store/store.js'
import getTariffs from './store/tariffs.js'
import renderStage from './render/stage.js'
import { renderProcessing, removeProcessing } from './render/processing.js'
import renderResult from './render/result.js'
import renderDeals from './render/deals.js'

if (process.env.NODE_ENV === 'development') {
  import('../stylesheets/demo.scss')
}

/**
 * init function to init store, render stage, add event listerners and tracking
 * @param options
 */
const init = (options) => {
  try {
    store.init(options)
    renderStage()
    listenToCheckClick()
    listenToEnterClick()
    track.embed()
    track.listenToVisibleEvent()
    track.listenToFormularInteraction()
  } catch (e) {
    console.error('smb-phone-plan: index.init()', e)
  }
}

/**
 * calculate user input and render result
 */
const calculate = () => {
  const formularData = validateFormularData()

  if (Object.keys(formularData).length === 0) {
    return
  }
  if (store.get().calculated === false) {
    renderProcessing()
  }
  getTariffs().then(() => {
    store.setResult(formularData)
  }).then(() => {
    removeProcessing()
    renderResult()
    renderDeals()
  })
}

/**
 * event listerner for check button
 */
const listenToCheckClick = () => {
  const checkButton = document.querySelector('[data-role="smb-phone-plan-check"]')

  if (checkButton === null) {
    return
  }

  checkButton.addEventListener('click', () => {
    calculate()
    track.checkButtonClick()
  })
}

/**
 * event listerner for enter button
 */
const listenToEnterClick = () => {
  document.onkeydown = (e) => {
    if (e.keyCode === 13) {
      calculate()
      track.checkButtonClick()
    }
  }
}

export default init
