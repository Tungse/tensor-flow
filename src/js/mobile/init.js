import store from '../store/store.js'
import { initEmbedo, embedoInst } from '../common/embedo.js'
import renderGalleryItems from './render.js'
import circulateAds from './ads.js'
import Observer from 'smb-element-observer'
import * as track from '../common/tracking'

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options
 * @param  {object} smbContext
 */
const init = (options, smbContext) => {
  store.init(options)
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

  if (typeof store.get().settings.mounted === 'function') {
    try {
      store.get().settings.mounted(store.get())
    } catch (e) {}
  }
}

/**
 * Apply gallers Items to HTML and to stateObject
 */
const applyGalleryItems = () => {
  const startTime = performance.now()

  const html = renderGalleryItems()
  document.querySelector(store.get().settings.contentSelector).insertAdjacentHTML('beforeend', html)
  store.set({
    galleryItems: document.querySelectorAll('.smb-gallery-item'),
  })

  const endTime = performance.now()
  console.info('Rendering Galleryitems took ' + (startTime - endTime) + ' Milliseconds.')
}

/**
 * If user starts with > #page-1 scroll that page
 * into the viewport
 */
const scrollInitialItemIntoView = () => {
  if (store.get().currentPage > 1) {
    store.get().galleryItems[store.get().currentPage - 1].scrollIntoView()
  }
}

/**
 * Bind events for intersection, popstate and tracking
 */
const bindEvents = () => {
  track.listenToBackButtonClick()

  store.get().galleryItems.forEach((elm, index) => {
    if (elm.querySelector('.smb-gallery-content')) {
      Observer.repeat(elm.querySelector('.smb-gallery-content'), () => {
        if (store.get().currentPage !== index + 1) {
          store.set({
            currentPage: index + 1,
          })
          track.pageview()
          window.history.pushState({ page: store.get().currentPage }, '', '#page-' + store.get().currentPage)
        }

        if (store.get().currentPage === store.get().galleryLength) {
          track.endcardEmbed()
          track.listenToEndcardVisible()
          track.listenToEndcardClick()
        }

        if (typeof window.iom !== 'undefined' && typeof window.iom.c === 'function' && typeof window.iam_data !== 'undefined') {
          try {
            window.iom.c(window.iam_data, store.get().settings.iamMode)
          } catch (e) {}
        }

        circulateAds()

        if (typeof store.get().settings.changed === 'function') {
          try {
            store.get().settings.changed(store.get())
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
