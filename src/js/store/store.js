import getData from './gallery-data.js'
import getReferrer from './referrer.js'
import getInitalPage from './url.js'

const defaultOptions = {
  iamMode: 2,
  adMode: 1,
  dataSelector: '#galleryData',
  endcardSelector: '#endcardData',
  stageSelector: '#galleryStage',
  contentSelector: '#galleryContent',
  nextIcon: '<i class="fas fa-angle-right"></i>',
  prevIcon: '<i class="fas fa-angle-left"></i>',
}

let history = []
let store = {}

const init = (options) => {
  const settings = Object.assign({}, defaultOptions, options)
  const data = getData(settings.dataSelector)

  set({
    settings: settings,
    data: data,
    galleryLength: data.itemListElement.length,
    referrer: getReferrer(),
    currentPage: getInitalPage(data.itemListElement.length),
  })
}

const get = () => {
  return store
}

const set = (action) => {
  store = Object.assign({}, store, action)
  history.push(store)
}

export default {
  get,
  set,
  init,
}
