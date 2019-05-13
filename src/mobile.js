import './stylesheets/mobile.scss'
import getData from './common/gallery-data.js'
import { renderMedia } from './common/render.js'

const defaults = {
  dataSelector: '#galleryData',
  contentSelector: '#galleryContent',
}

let settings = {}
let state = {}

/**
 * [init description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
const init = (options, smbContext) => {
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
  document.querySelector(settings.contentSelector).innerHTML = render()

  if (typeof settings.afterPageRender === 'function') {
    settings.afterPageRender(state)
  }
}

const render = () => {
  return `
    ${state.data.itemListElement.map((page, i) => `
      <div class="smb-gallery-item">
        <div class="smb-gallery-media">
          ${renderMedia(page.item)}
        </div>
        <div class="smb-gallery-content">
          <h2>${page.item.headline}</h2>
          ${page.item.description}
        </div>
        <div class="smb-gallery-ed-container">
        </div>
      </div>
    `.trim()).join('')}

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
  `
}

export default init
