import getSettings from '../common/settings.js'
import getState from '../common/state.js'
import { initEmbedo, embedoInst } from '../common/embedo.js'
import renderGalleryItems from './render.js'
import circulateAds from './ads.js'
import Observer from 'smb-element-observer'
import * as track from '../common/tracking'

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
  renderGallery()
  initEmbedo()
}

/**
 * Insert html and bind events afterwards.
 * Scrolls initial into view.
 * Execute "afterPageRender"-callback if provided.
 */
const renderGallery = () => {
  applyGalleryItems()
  scrollInitialItemIntoView()
  bindEvents()

  if (typeof settings.mounted === 'function') {
    try {
      settings.mounted(state)
    } catch (e) {}
  }
}

/**
 * Apply gallers Items to HTML and to stateObject
 */
const applyGalleryItems = () => {
  var startTime = performance.now()
  document.querySelector(settings.contentSelector).insertAdjacentHTML('beforeend', renderGalleryItems(state))
  state.galleryItems = document.querySelectorAll('.smb-gallery-item')
  var endTime = performance.now()
  console.info('Rendering Galleryitems took ' + (startTime - endTime) + ' Milliseconds.')
}

/**
 * If user starts with > #page-1 scroll that page
 * into the viewport
 */
const scrollInitialItemIntoView = () => {
  if (state.currentPage > 1) {
    state.galleryItems[state.currentPage - 1].scrollIntoView()
  }
}

/**
 * Bind events for intersection, popstate and tracking
 */
const bindEvents = () => {
  track.listenToBackButtonClick(state)

  state.galleryItems.forEach((elm, index) => {
    if (elm.querySelector('.smb-gallery-content')) {
      Observer.repeat(elm.querySelector('.smb-gallery-content'), () => {
        if (state.currentPage !== index + 1) {
          state.currentPage = index + 1
          track.pageview(state)
          window.history.pushState({ page: state.currentPage }, '', '#page-' + state.currentPage)
        }

        if (state.currentPage === state.length) {
          track.endcardEmbed()
          track.listenToEndcardVisible()
          track.listenToEndcardClick()
        }

        if (typeof window.iom !== 'undefined' && typeof window.iom.c === 'function' && typeof window.iam_data !== 'undefined') {
          try {
            window.iom.c(window.iam_data, settings.iamMode)
          } catch (e) {}
        }

        circulateAds(state)

        if (typeof settings.changed === 'function') {
          try {
            settings.changed(state)
          } catch (e) {}
        }
      })
    }

    if (elm.querySelector('[data-role="embedo"]')) {
      const post = elm.querySelector('[data-role="embedo"]')
      const postUrl = post.getAttribute('data-url')

      Observer.once(elm, () => {
        try {
          embedoInst.load(post, postUrl, {centerize: true})
        } catch (e) {}
      }, 200)
    }
  })
}

export default init
