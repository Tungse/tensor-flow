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
let state = {}

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options [description]
 * @param  {object} smbContext [description]
 */
const init = (options, smbContext) => {
  settings = Object.assign({}, defaults, options)

  state.data = getData(settings.dataSelector)
  state.length = state.data.itemListElement.length
  state.referrer = getReferrer()
  state.currentPage = getInitalPage(state.length)

  renderPage()
}

/**
 * Insert html and bind events afterwards.
 * Scrolls initial into view.
 * Execute "afterPageRender"-callback if provided.
 */
const renderPage = () => {
  document.querySelector(settings.contentSelector).innerHTML = render()
  state.galleryItems = document.querySelectorAll('.smb-gallery-item')

  if (state.currentPage > 1) {
    state.galleryItems[state.currentPage].scrollIntoView()
  }

  bindEvents()

  if (typeof settings.afterPageRender === 'function') {
    settings.afterPageRender(state)
  }
}

/**
 * Bind events for intersection, popstate and tracking
 */
const bindEvents = () => {
  state.galleryItems.forEach((elm, index) => {
    Observer.repeat(elm, () => {
      if (state.currentPage !== index + 1) {
        state.currentPage = index + 1
        window.history.pushState({ page: state.currentPage }, '', '#page-' + state.currentPage)
      }

      circulateAds()
    })
  })
}

/**
 * [circulateAds description]
 */
const circulateAds = () => {
  state.galleryItems.forEach((elm, index) => {
    elm.querySelector('[data-role="sdg-ad"]').setAttribute('data-sdg-ad', `galleryad${index === 0 ? '' : index + 1}`)
    window.adLoader('_loadAds', ['galleryad', 'galleryad2', 'galleryad4', 'galleryad5'])
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
