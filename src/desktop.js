import './stylesheets/desktop.scss'
import './stylesheets/demo.scss'
import getData from './common/gallery-data.js'
import getReferrer from './common/referrer.js'
import Filer from '../node_modules/filer-js-sdk/dist/filer.js'

const defaults = {
  dataSelector: '#galleryData',
  stageSelector: '#galleryStage',
  contentSelector: '#galleryContent',
}

let settings = {}
let state = {}

/**
 * [init description]
 * @param  {[type]} options [description]
 * @param  {[type]} smbContext [description]
 * @return {[type]}         [description]
 */
const init = (options, smbContext) => {
  settings = Object.assign({}, defaults, options)

  state.data = getData(settings.dataSelector)
  state.length = state.data.itemListElement.length
  state.referrer = getReferrer()

  const hashPage = parseInt(location.hash.replace(/^\D+/g, ''))

  if (typeof hashPage === 'number' && hashPage <= state.length && hashPage > 0) {
    state.currentPage = hashPage
  } else {
    state.currentPage = 1
    history.replaceState({}, '', '#page-1')
  }

  renderPage()
}

const renderPage = () => {
  document.querySelector(settings.stageSelector).innerHTML = renderStage()
  document.querySelector(settings.contentSelector).innerHTML = renderContent()
  bindEvents()

  if (typeof settings.afterPageRender === 'function') {
    settings.afterPageRender(state)
  }

  console.log(state)
}

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

const renderContent = () => {
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
          <a role="smb-gallery-prev" class="btn btn-primary" href="#"><i class="fas fa-angle-left"></i> zurück</a>
          <a role="smb-gallery-next" class="btn btn-primary" href="#">weiter <i class="fas fa-angle-right"></i></a>
        </div>
      </div>
    </div>
  `
}

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
}

const goPrev = () => {
  if (state.currentPage > 1) {
    state.currentPage = state.currentPage - 1
    go()
  }
}

const goNext = () => {
  if (state.currentPage < state.length) {
    state.currentPage = state.currentPage + 1
    go()
  }
}

const go = () => {
  renderPage()
  history.pushState({}, '', '#page-' + state.currentPage)

  if (typeof window.smbt !== 'undefined') {
    window.smbt.emit('pageview')
  }

  if (typeof iom !== 'undefined' && typeof window.iom.c === 'function' && typeof window.iam_data !== 'undefined') {
    window.iom.c(window.iam_data, 2)
  }

  // TODO
  // is this needed?
  // https://github.com/smb-ag/shuttle/blob/develop/project/core/plugin/basic/general/feature/static/js/general.functions.js#L90

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

const resetBodyStyles = () => {
  document.body.style = ''

  if (window.bb) {
    window.bb.unload()
  }
}

export default { init: init }
