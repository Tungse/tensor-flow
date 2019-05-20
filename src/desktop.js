import './stylesheets/desktop.scss'
import './stylesheets/demo.scss'
import getData from './common/gallery-data.js'
import getReferrer from './common/referrer.js'
import getInitalPage from './common/url.js'
import Filer from '../node_modules/filer-js-sdk/dist/filer.js'

const defaults = {
  dataSelector: '#galleryData',
  stageSelector: '#galleryStage',
  contentSelector: '#galleryContent',
}

let settings = {}
export let state = {}

/**
 * set initial state and render page depending
 * on url; if no page is set first page will render.
 * @param  {object} options [description]
 * @param  {object} smbContext [description]
 */
const init = (options, smbContext) => {
  setInitialState(options)
  renderPage()
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
 * Update html and bind events afterwards.
 * Execute "afterPageRender"-callback if provided.
 */
const renderPage = () => {
  document.querySelector(settings.stageSelector).innerHTML = renderStage()
  document.querySelector(settings.contentSelector).innerHTML = renderContent()
  bindEvents()

  if (typeof settings.afterPageRender === 'function') {
    settings.afterPageRender(state)
  }

  console.log(state)
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

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        goPrev()
        break
      case 39:
        goNext()
        break
    }
  }

  window.onpopstate = function (event) {
    if (event.state && event.state.page) {
      state.currentPage = event.state.page
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
    window.history.pushState({ page: state.currentPage }, '', '#page-' + state.currentPage)

    go()
  }
}

/**
 * Set state to next page push new page to history
 */
const goNext = () => {
  if (state.currentPage < state.length) {
    state.currentPage = state.currentPage + 1
    window.history.pushState({ page: state.currentPage }, '', '#page-' + state.currentPage)

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

  if (typeof window.smbt !== 'undefined') {
    window.smbt.emit('pageview')
  }

  if (typeof iom !== 'undefined' && typeof window.iom.c === 'function' && typeof window.iam_data !== 'undefined') {
    window.iom.c(window.iam_data, 2)
  }

  if (typeof window.adLoader !== 'undefined') {
    try {
      resetBodyStyles()
      window.adLoader('_reloadAds')
    } catch (e) {}
  }

  if (typeof settings.onItemChange === 'function') {
    settings.onItemChange(state)
  }
}

/**
 * Reset styles that are applyed by brandbooster
 * or other advertisments; called before ad reloads.
 */
const resetBodyStyles = () => {
  document.body.style = ''

  if (window.bb) {
    window.bb.unload()
  }
}

/**
 * Renders Stage depending on current state
 * @return {string} template string
 */
const renderStage = () => {
  const prevPage = state.data.itemListElement[state.currentPage - 2]
  const page = state.data.itemListElement[state.currentPage - 1]
  const nextPage = state.data.itemListElement[state.currentPage]

  return `
    <div class="smb-gallery-header">
      ${state.currentPage > 1 ? `
        <a role="smb-gallery-prev" class="smb-gallery-nav smb-gallery-nav-left" href="${prevPage.item.url}">
          <div class="smb-gallery-button">
            <i class="fas fa-angle-left"></i>
          </div>
        </a>
      ` : ''}
      <div class="smb-gallery-media">
        ${renderMedia(page.item)}
      </div>
      ${state.currentPage < state.length ? `
        <a role="smb-gallery-next" class="smb-gallery-nav smb-gallery-nav-right" href="${nextPage.item.url}">
          <div class="smb-gallery-button">
            <i class="fas fa-angle-right"></i>
          </div>
        </a>
      ` : ''}
    </div>

    <div class="smb-gallery-info">
      <small>Bildquelle: ${page.item.copyrightHolder}</small>
      <small>${state.currentPage} / ${state.length}</small>
    </div>
  `
}

/**
 * Renders MediaItem
 * @return {string} template string
 */
const renderMedia = (item) => {
  switch (item['@type']) {
    case 'ImageObject':
      return `
        <img class="" src="${Filer.createVariantUrl(item.contentUrl, [['rcm', 0, 450, 'u']])}" alt="">
      `
    case 'VideoObject':
      return `
        <iframe class="" src="${item.embedUrl}"></iframe>
      `
    default:
      return ``
  }
}

/**
 * Renders Content depending on current state
 * @return {string} template string
 */
export const renderContent = () => {
  const page = state.data.itemListElement[state.currentPage - 1]

  return `
    <div class="smg-gallery-body">
      ${page.item.description}

      <div class="smb-gallery-btn-nav">
        <div>
        ${state.referrer ? `
          <a role="smb-gallery-back" class="btn btn-link" href="${state.referrer}"><i class="fas fa-angle-left"></i> zurück zum Artikel</a>
        ` : ''}
        </div>
        <div>
          <a role="smb-gallery-prev" class="btn btn-primary ${state.currentPage === 1 ? 'disabled' : ''}" href="#"><i class="fas fa-angle-left"></i> zurück</a>
          <a role="smb-gallery-next" class="btn btn-primary ${state.currentPage === state.length ? 'disabled' : ''}" href="#">weiter <i class="fas fa-angle-right"></i></a>
        </div>
      </div>
    </div>
  `
}

export default { init: init }
