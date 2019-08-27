import '../stylesheets/gallery.scss'
import desktop from './desktop/init.js'
import mobile from './mobile/init.js'

if (process.env.NODE_ENV === 'development') {
  import('../stylesheets/demo.scss')
}

const init = (options) => {
  try {
    if (options && options.device === 'smartphone') {
      mobile(options)
    } else {
      desktop(options)
    }
  } catch (e) {
    renderErrorMessage(options)
    console.error('smb-gallery: index.init()', e)
  }
}

const renderErrorMessage = (options) => {
  if (options && document.querySelector(options.contentSelector)) {
    document.querySelector(options.contentSelector).innerHTML = 'Die Bilderstrecke kann nicht angezeigt werden.'
  }
}

export default init
