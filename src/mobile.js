import './stylesheets/mobile.scss'
import './stylesheets/demo.scss'
import getData from './common/gallery-data.js'
import getReferrer from './common/referrer.js'
import getInitalPage from './common/initial-page.js'
import Filer from '../node_modules/filer-js-sdk/dist/filer.js'
import Observer from 'smb-element-observer'

const defaults = {
  dataSelector: '#galleryData',
  contentSelector: '#galleryContent',
}

let settings = {}
let state = {
  adslots: [
    {
      name: 'galleryad',
      assigned: false,
      loaded: false,
    },
    {
      name: 'galleryad2',
      assigned: false,
      loaded: false,
    },
    {
      name: 'galleryad3',
      assigned: false,
      loaded: false,
    },
    {
      name: 'galleryad4',
      assigned: false,
      loaded: false,
    },
  ],
}

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options [description]
 * @param  {object} smbContext [description]
 */
const init = (options, smbContext) => {
  setInitialState(options)
  renderGallery()
}

/**
 * Assign settings and set init state based on gallery data
 * @param {Object} options [description]
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
  document.querySelector(settings.contentSelector).innerHTML = render()
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

      circulateAds()
    })
  })
}

/**
 * Find all galleryItems that should have ads and load them.
 * Find all galleryItems that should not have ads and remove them.
 */
const circulateAds = () => {
  const itemsThatShouldHaveAds = determineItemsThatShouldHaveAds()

  unAssignAds(itemsThatShouldHaveAds)
  assignAds(itemsThatShouldHaveAds)
}

/**
 * Returns Array with galleryItems that should have ads.
 * We select current page, page before, next page and page after next page
 * @return {Array} [description]
 */
const determineItemsThatShouldHaveAds = () => {
  let itemsThatShouldHaveAds = []

  // page before
  if (state.galleryItems[state.currentPage - 2]) {
    itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage - 2])
  }

  // current page
  if (state.galleryItems[state.currentPage - 1]) {
    itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage - 1])
  }

  // next page
  if (state.galleryItems[state.currentPage]) {
    itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage])
  }

  // page after next page
  if (state.galleryItems[state.currentPage + 1]) {
    itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage + 1])
  }

  return itemsThatShouldHaveAds
}

/**
 * For each galleryItem check if it is an "itemThatShouldHaveAds"
 * if not we can removeAds from it
 * @param  {Array} itemsThatShouldHaveAds [description]
 */
const unAssignAds = (itemsThatShouldHaveAds) => {
  state.galleryItems.forEach((elm, index) => {
    if (itemsThatShouldHaveAds.indexOf(elm) === -1) {
      const adContainer = elm.querySelector('[data-role="sdg-ad"]')

      if (adContainer.getAttribute('data-sdg-ad')) {
        const slotname = adContainer.getAttribute('data-sdg-ad')

        elm.querySelector('[data-role="sdg-ad"]').removeAttribute('data-sdg-ad')
        setAdslotFree(slotname)
        window.adLoader('_removeAds', [slotname], true)
      }
    }
  })
}

const assignAds = (itemsThatShouldHaveAds) => {
  itemsThatShouldHaveAds.forEach((elm, i) => {
    const adContainer = elm.querySelector('[data-role="sdg-ad"]')

    if (!adContainer.hasAttribute('data-sdg-ad')) {
      const availableAdslot = getFirstNotAssignedAdslot()
      adContainer.setAttribute('data-sdg-ad', state.adslots[availableAdslot].name)
      state.adslots[availableAdslot].assigned = true
      window.adLoader('_loadAds', [state.adslots[availableAdslot].name])
    }
  })
}

const getUnAsssignedAds = () => {

}

const getNewlyAsssignedAds = () => {

}

const setAdslotFree = (name) => {
  for (var i = 0; i < state.adslots.length; i++) {
    if (state.adslots[i].name === name) {
      state.adslots[i].assigned = false
      break
    }
  }
}

const getFirstNotAssignedAdslot = () => {
  for (var i = 0; i < state.adslots.length; i++) {
    if (!state.adslots[i].assigned) {
      return i
    }
  }
}

/**
 * Build template string for gallery
 * @return {string} template string
 */
const render = () => {
  return `
    ${state.data.itemListElement.map((page, i) => `
      <div class="smb-gallery-item">
        <div class="smb-gallery-media">
          ${renderMedia(page.item)}
        </div>
        <div class="smb-gallery-content">
        ${i === 0 ? `
          <h1>${page.item.headline}</h1>
        ` : `
          <h2>${page.item.headline}</h2>
        `}
          ${page.item.description}
        </div>
        <div class="smb-gallery-ed-container">
          <div data-role="sdg-ad"></div>
        </div>
      </div>
    `.trim()).join('')}
  `
}

/**
 * Build templates-strings for different media items
 * @return {string} template string
 */
const renderMedia = (item) => {
  switch (item['@type']) {
    case 'ImageObject':
      return `
        ${item.width > 0 && item.height > 0 ? `
          <div class="embed-responsive" style="padding-bottom: ${item.height / item.width * 100}%">
            <img class="embed-responsive-item lazy" data-src="${Filer.createVariantUrl(item.contentUrl, [['rcm', 480, 0, 'u']])}" alt="">
          </div>
        ` : `
          <img class="lazy" data-src="${Filer.createVariantUrl(item.contentUrl, [['rcm', 480, 0, 'u']])}" alt="">
        `}
      `
    case 'VideoObject':
      return `<iframe class="lazy" data-src="${item.embedUrl}"></iframe>`
    default:
      return ``
  }
}

export default { init: init }
