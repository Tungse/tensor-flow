import './stylesheets/mobile.scss'
import './stylesheets/demo.scss'
import getData from './common/gallery-data.js'
import getReferrer from './common/referrer.js'
import getInitalPage from './common/url.js'
import Filer from '../node_modules/filer-js-sdk/dist/filer.js'
import Observer from 'smb-element-observer'
import Embedo from 'embedo'

const defaults = {
  dataSelector: '#galleryData',
  contentSelector: '#galleryContent',
}

let settings = {}
let state = {}

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options [description]
 * @param  {object} smbContext [description]
 */
const init = (options, smbContext) => {
  setInitialState(options)
  renderGallery()

  const embedo = new Embedo({
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
 * @param  {Array} itemsThatShouldHaveAds
 */
const unAssignAds = (itemsThatShouldHaveAds) => {
  state.galleryItems.forEach((elm, index) => {
    if (itemsThatShouldHaveAds.indexOf(elm) === -1) {
      const adContainer = elm.querySelector('[data-slotname]')

      if (adContainer.getAttribute('data-sdg-ad')) {
        window.adLoader('_removeAds', [adContainer], true)
        adContainer.removeAttribute('data-sdg-ad')
      }
    }
  })
}

/**
 * For each itemsThatShouldHaveAds check if it has already an Ad
 * if not we can load it
 * @param  {Array} itemsThatShouldHaveAds
 */
const assignAds = (itemsThatShouldHaveAds) => {
  itemsThatShouldHaveAds.forEach((elm, i) => {
    const adContainer = elm.querySelector('[data-slotname]')

    if (!adContainer.hasAttribute('data-sdg-ad')) {
      const slotname = adContainer.getAttribute('data-slotname')

      adContainer.setAttribute('data-sdg-ad', slotname)
      window.adLoader('_loadAds', [adContainer])
    }
  })
}

/**
 * Build template string for gallery
 * @return {string} template string
 */
const render = () => {
  return `
    ${state.data.itemListElement.map((page, i) => `
      <div class="smb-gallery-item">
        <div class="smb-gallery-media ${page.item['@type']}">
          ${renderMedia(page.item)}
        </div>
        ${page.item.copyrightHolder ? `
        <div class="smb-gallery-info">
          <small>Bildquelle: ${page.item.copyrightHolder}</small>
        </div>
        ` : ''}
        <div class="smb-gallery-content">
        ${i === 0 ? `
          <h1>${page.item.headline}</h1>
        ` : `
          <h2>${page.item.headline}</h2>
        `}
          ${page.item.description}
        </div>
        <div class="smb-gallery-ed-container">
          <div data-slotname="${getSlotName(i)}"></div>
        </div>
      </div>
    `.trim()).join('')}
  `
}

/**
 * Find slotname by index
 * @param  {Int} i
 * @return {String}
 */
const getSlotName = (i) => {
  switch (i % 4) {
    case 0:
      return 'galleryad'
    case 1:
      return 'galleryad2'
    case 2:
      return 'galleryad3'
    case 3:
      return 'galleryad4'
  }
}

/**
 * Build templates-strings for different media items
 * @return {string}
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
    case 'SocialMediaPosting':
      return `<div data-embedo-url="${item.sharedContent.url}"></div>`
    default:
      return ``
  }
}

export default { init: init }
