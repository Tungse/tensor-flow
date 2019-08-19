import getSettings from './common/settings.js'
import getState from './common/state.js'
import { initEmbedo, embedoInst } from './common/embedo.js'
import renderGalleryItems from './mobile/render.js'
import circulateAds from './mobile/ads.js'
import Observer from 'smb-element-observer'

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
  applyEndcard()
  scrollInitialItemIntoView()
  bindEvents()

  if (typeof settings.afterPageRender === 'function') {
    settings.afterPageRender(state)
  }
}

/**
 * Apply gallers Items to HTML and to stateObject
 */
const applyGalleryItems = () => {
  document.querySelector(settings.contentSelector).innerHTML = renderGalleryItems(state)
  state.galleryItems = document.querySelectorAll('.smb-gallery-item')
}

/**
 * Apply endcard items to HTML
 */
const applyEndcard = () => {
  // TODO: apply endcard
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
  state.galleryItems.forEach((elm, index) => {
    Observer.repeat(elm.querySelector('.smb-gallery-content'), () => {
      if (state.currentPage !== index + 1) {
        state.currentPage = index + 1
        window.history.pushState({ page: state.currentPage }, '', '#page-' + state.currentPage)
      }

      circulateAds(state)
    })

    if (elm.querySelector('[data-role="embedo"]')) {
      const post = elm.querySelector('[data-role="embedo"]')
      const postUrl = post.getAttribute('data-url')

      Observer.once(elm, () => {
        embedoInst.load(post, postUrl, { centerize: true })
      }, 200)
    }
  })
}

export default init
