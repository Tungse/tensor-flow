import './assets/style.scss'
import './assets/demo.scss'
import getData from './common/gallery-data.js'
import { renderMedia } from './common/render.js'

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
 * @return {[type]}         [description]
 */
const init = (options) => {
  settings = Object.assign({}, defaults, options)

  state.data = getData(settings.dataSelector)
  state.length = state.data.itemListElement.length

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

const renderContent = () => {
  const page = state.data.itemListElement[state.currentPage - 1]

  return `
    <div class="smg-gallery-body">
      ${page.item.description}

      <div class="smb-gallery-btn-nav">
        <a role="smb-gallery-prev" class="btn btn-link" href="#"><i class="fas fa-angle-left"></i> zurück zum Artikel</a>
        <a role="smb-gallery-next" class="btn btn-primary" href="#">weiter <i class="fas fa-angle-right"></i></a>
      </div>

      <div>
        ${state.currentPage === state.length ? `
          <h3>Weitere Bilderstrecken</h3>
          <div class="row" style="margin-bottom: 25px">
            <div class="col-md-4">
              <div class="" style="height: 125px; background: #ddd;"></div>
            </div>
            <div class="col-md-4">
              <div class="" style="height: 125px; background: #ddd;"></div>
            </div>
            <div class="col-md-4">
              <div class="" style="height: 125px; background: #ddd;"></div>
            </div>
          </div>
          <div class="row" style="margin-bottom: 25px">
            <div class="col-md-4">
              <div class="" style="height: 125px; background: #ddd;"></div>
            </div>
            <div class="col-md-4">
              <div class="" style="height: 125px; background: #ddd;"></div>
            </div>
            <div class="col-md-4">
              <div class="" style="height: 125px; background: #ddd;"></div>
            </div>
          </div>
        ` : ''}
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
  history.pushState({}, '', '#page-' + state.currentPage)
  renderPage()

  if (typeof settings.onItemChange === 'function') {
    settings.onItemChange(state)
  }
}

export default { init: init }
