import './assets/style.scss'
import './assets/demo.scss'

const defaults = {
  dataSelector: '#galleryData',
  stageSelector: '',
  contentSelector: '',
}

let settings = {}
let state = {
  data: {},
  currentPage: 0,
  length: 0,
}

/**
 * [init description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
const init = (options) => {
  settings = Object.assign({}, defaults, options)

  state.data = getData()
  state.length = state.data.itemListElement.length

  renderPage()
}

const getData = () => {
  const htmlString = document.querySelector(settings.dataSelector).innerHTML

  return JSON.parse(htmlString)
}

const renderPage = () => {
  document.querySelector(settings.stageSelector).innerHTML = renderStage(state)
  document.querySelector(settings.contentSelector).innerHTML = renderContent(state)

  bindEvents()
}

const renderStage = () => {
  const page = state.data.itemListElement[state.currentPage]

  return `
    <div class="smb-gallery-header">
      <a role="smb-gallery-prev" class="smb-gallery-nav smb-gallery-nav-left" href="#">
        <div class="smb-gallery-button">
          <i class="fas fa-angle-left"></i>
        </div>
      </a>
      <div class="smb-gallery-media">
        ${page.item['@type'] === 'ImageObject' ? `<img class="" src="${page.item.contentUrl}" alt="">` : ''}
      </div>
      <a role="smb-gallery-next" class="smb-gallery-nav smb-gallery-nav-right" href="#">
        <div class="smb-gallery-button">
          <i class="fas fa-angle-right"></i>
        </div>
      </a>
    </div>

    <div class="smb-gallery-info">
      <small>Bildquelle: Lorem Impsum</small>
      <small>${state.currentPage + 1} / ${state.length}</small>
    </div>
  `
}

const renderContent = () => {
  const page = state.data.itemListElement[state.currentPage]

  return `
    <div class="smg-gallery-body">
      ${page.item.description}

      <div class="smb-gallery-btn-nav">
        <a role="smb-gallery-prev" class="btn btn-link" href="#"><i class="fas fa-angle-left"></i> zurück zum Artikel</a>
        <a role="smb-gallery-next" class="btn btn-primary" href="#">weiter <i class="fas fa-angle-right"></i></a>
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
  if (state.currentPage > 0) {
    state.currentPage = state.currentPage - 1
    renderPage()

    if (typeof settings.onItemChange === 'function') {
      settings.onItemChange(state)
    }
  }
}

const goNext = () => {
  if (state.currentPage < state.length - 1) {
    state.currentPage = state.currentPage + 1
    renderPage()

    if (typeof settings.onItemChange === 'function') {
      settings.onItemChange(state)
    }
  }
}

export default { init: init }
