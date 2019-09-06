import '../stylesheets/imports.scss'
import store from './store/store.js'
import getTariffs from './store/tariffs.js'
import renderDeals from './render/deals.js'
import renderResult from './render/result.js'
import * as track from './common/tracking.js'
import { validateFormularData } from './common/validation.js'
import { renderProcessing, removeProcessing } from './render/processing.js'
import { renderStage, blurFormular, unBlurFormular } from './render/stage.js'

if (process.env.NODE_ENV === 'development') {
  import('../stylesheets/demo.scss')
}

/**
 * init function to init store, render stage, add event listerners and tracking
 * @param options
 */
const init = (options) => {
  store.init(options)

  if (store.get().container === null) {
    return
  }

  renderStage()
  listenToCheckClick()
  listenToEnterClick()
  listenToFormularInteraction()
  track.embed()
  track.listenToVisibleEvent()
}

/**
 * event listerner for check button
 */
const listenToCheckClick = () => {
  const checkButton = store.get().container.querySelector('[data-role="smb-phone-plan-check"]')

  if (checkButton === null) {
    return
  }

  checkButton.addEventListener('click', () => {
    track.checkButtonClick()
    calculateUserTarif()
  })
}

/**
 * event listerner for enter button
 */
const listenToEnterClick = () => {
  document.onkeydown = (e) => {
    if (e.keyCode === 13) {
      track.checkButtonClick()
      calculateUserTarif()
    }
  }
}

/**
 * calculate user input and render result
 */
const calculateUserTarif = () => {
  const formularData = validateFormularData()

  if (Object.keys(formularData).length === 0) {
    return
  }

  renderProcessing()
  blurFormular()
  getTariffs().then(() => {
    store.setResult(formularData)
  }).then(() => {
    removeProcessing()
    renderResult()
    renderDeals()
  })
}

/**
 * add event listerner to track formular interaction.
 */
export const listenToFormularInteraction = () => {
  const formularItems = store.get().container.querySelectorAll('[data-role="smb-phone-plan-formular-item"]')

  for (let i = 0; i < formularItems.length; i++) {
    const formularItem = formularItems[i]

    listenToFormularFocussed(formularItem)
    track.listenToFormularInputChanged(formularItem)
  }
}

/**
 * unblur formular if one of the inputs are focussed and formular is already blur
 * @param formularItem
 */
const listenToFormularFocussed = (formularItem) => {
  formularItem.addEventListener('focus', () => {
    unBlurFormular()
  })
}

export default init
