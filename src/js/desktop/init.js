import store from '../store/store.js'
import * as track from '../common/tracking.js'
import { initEmbedo, embedoInst } from '../common/embedo.js'
import { renderStage, renderContent } from './render.js'

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options
 * @param  {object} smbContext
 */
const init = (options, smbContext) => {
  store.init(options)
  initEmbedo()
  renderPage()

  if (typeof store.get().mounted === 'function') {
    try {
      store.get().mounted(store.get())
    } catch (e) {}
  }
}

/**
 * Update html and bind events afterwards.
 * Execute "afterPageRender"-callback if provided.
 */
const renderPage = () => {
  document.querySelector(store.get().settings.stageSelector).innerHTML = renderStage()
  document.querySelector(store.get().settings.contentSelector).innerHTML = renderContent()
  bindEvents()

  try {
    embedoInst.domify()
  } catch (e) {}
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

  track.listenToBackButtonClick()

  if (store.get().currentPage === store.get().galleryLength) {
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
      store.set({
        currentPage: e.state.page,
      })
    } else {
      store.set({
        currentPage: 1,
      })
    }

    go()
  }
}

/**
 * Set state to prev page push new page to history
 */
const goPrev = () => {
  if (store.get().currentPage > 1) {
    store.set({
      currentPage: store.get().currentPage - 1,
    })
    window.history.pushState({ page: store.get().currentPage }, '', `#page-${store.get().currentPage}`)

    go()
  }
}

/**
 * Set state to next page push new page to history
 */
const goNext = () => {
  if (store.get().currentPage < store.get().galleryLength) {
    store.set({
      currentPage: store.get().currentPage + 1,
    })
    window.history.pushState({ page: store.get().currentPage }, '', `#page-${store.get().currentPage}`)

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
      window.iom.c(window.iam_data, store.get().settings.iamMode)
    } catch (e) {}
  }

  if (typeof window.adLoader !== 'undefined') {
    resetBodyStyles()
    try {
      window.adLoader('_reloadAds')
    } catch (e) {}
  }

  track.pageview()

  if (typeof store.get().settings.changed === 'function') {
    try {
      store.get().settings.changed(store.get())
    } catch (e) {}
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
    } catch (e) {}
  }
}

export default init
