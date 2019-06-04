import './stylesheets/mobile.scss'
import './stylesheets/demo.scss'
import getData from './common/gallery-data.js'
import getReferrer from './common/referrer.js'
import getInitalPage from './common/url.js'
import renderGalleryItems from './mobile/render.js'
import circulateAds from './mobile/ads.js'
import Observer from 'smb-element-observer'
import Embedo from 'embedo'

const defaults = {
  dataSelector: '#galleryData',
  contentSelector: '#galleryContent',
}

let settings = {}
let state = {}
let embedo = {}

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options
 * @param  {object} smbContext
 */
const init = (options, smbContext) => {
  setInitialState(options)
  renderGallery()

  embedo = new Embedo({
    facebook: {
      appId: 'my_app_id', // Enable facebook SDK
      version: 'v2.10',
    },
    twitter: true,
    instagram: true,
    pinterest: true,
    centerize: false,
    strict: true,
    hidecaption: true,
  })
}

/**
 * Assign settings and set init state based on gallery data
 * @param {Object} options
 */
const setInitialState = (options) => {
  settings = Object.assign({}, defaults, options)

  state.data = getData(settings.dataSelector)
  state.length = state.data.itemListElement.length
  state.referrer = getReferrer()
  state.currentPage = getInitalPage(state.length)
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
 * If user starts with /#page-6 we initial scroll that page
 * into the viewport
 */
const scrollInitialItemIntoView = () => {
  if (state.currentPage > 1) {
    state.galleryItems[state.currentPage].scrollIntoView()
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
        embedo.load(post, postUrl, { centerize: true })
      }, 200)
    }
  })
}

export default { init: init }
