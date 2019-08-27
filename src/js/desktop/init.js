import getSettings from '../common/settings.js'
import getState from '../common/state.js'
import * as track from '../common/tracking.js'
import { initEmbedo, embedoInst } from '../common/embedo.js'
import { renderStage, renderContent } from './render.js'

let settings = {}
let state = {}

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options
 * @param  {object} smbContext
 */
const init = (options, smbContext) => {
  settings = getSettings(options)
  state = getState(settings)
  initEmbedo()
  renderPage()

  if (typeof settings.mounted === 'function') {
    try {
      settings.mounted(state)
    } catch (e) {
      console.warn('error: desktop init.init() mounted', e)
    }
  }
}

/**
 * Update html and bind events afterwards.
 * Execute "afterPageRender"-callback if provided.
 */
const renderPage = () => {
  document.querySelector(settings.stageSelector).innerHTML = renderStage(state, settings)
  document.querySelector(settings.contentSelector).innerHTML = renderContent(state, settings)
  bindEvents()
  embedoInst.domify()
}

/**
 * Bind events for navigation, popstate and tracking
 */
const bindEvents = () => {
  document.querySelectorAll('[role=smb-gallery-prev]').forEach((elm) => {
    elm.addEventListener('click', (e) => {
      e.preventDefault()
      goPrev()
    })
  })

  document.querySelectorAll('[role=smb-gallery-next]').forEach((elm) => {
    elm.addEventListener('click', (e) => {
      e.preventDefault()
      goNext()
    })
  })

  track.listenToBackButtonClick(state)
  if (state.currentPage === state.length) {
    track.endcardEmbed()
    track.listenToEndcardVisible()
    track.listenToEndcardClick()
  }

  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        goPrev()
        break
      case 65:
        goPrev()
        break
      case 39:
        goNext()
        break
      case 68:
        goNext()
        break
    }
  }

  window.onpopstate = (e) => {
    if (e.state && e.state.page) {
      state.currentPage = e.state.page
    } else {
      state.currentPage = 1
    }

    go()
  }
}

/**
 * Set state to prev page push new page to history
 */
const goPrev = () => {
  if (state.currentPage > 1) {
    state.currentPage = state.currentPage - 1
    try {
      window.history.pushState({ page: state.currentPage }, '', `#page-${state.currentPage}`)
    } catch (e) {
      console.warn('error: desktop init.goPrev()', e)
    }

    go()
  }
}

/**
 * Set state to next page push new page to history
 */
const goNext = () => {
  if (state.currentPage < state.length) {
    state.currentPage = state.currentPage + 1
    try {
      window.history.pushState({ page: state.currentPage }, '', `#page-${state.currentPage}`)
    } catch (e) {
      console.warn('error: desktop init.goNext()', e)
    }

    go()
  }
}

/**
 * This function is called on every popstate-event and after pushState is called.
 * New page gets rendered and tracked as new page impression.
 * Executes "onItemChange"-callback if provided.
 */
const go = () => {
  renderPage()

  window.scrollTo(0, 0)

  if (typeof window.iom !== 'undefined' && typeof window.iom.c === 'function' && typeof window.iam_data !== 'undefined') {
    try {
      window.iom.c(window.iam_data, settings.iamMode)
    } catch (e) {
      console.warn('error: desktop init.go() iom', e)
    }
  }

  if (typeof window.adLoader !== 'undefined') {
    try {
      resetBodyStyles()
      window.adLoader('_reloadAds')
    } catch (e) {
      console.warn('error: desktop init.go() adLoader', e)
    }
  }

  track.pageview(state)

  if (typeof settings.changed === 'function') {
    try {
      settings.changed(state)
    } catch (e) {
      console.warn('error: desktop init.go() changed', e)
    }
  }
}

/**
 * Reset styles that are applyed by brandbooster
 * or other advertisments; called before ad reloads.
 */
const resetBodyStyles = () => {
  document.body.style = ''

  if (window.bb) {
    try {
      window.bb.unload()
    } catch (e) {
      console.warn('error: desktop init.resetBodyStyles()', e)
    }
  }
}

export default init
