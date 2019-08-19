import './stylesheets/gallery.scss'
import desktop from './desktop'
import mobile from './mobile.js'

const init = (options) => {
  if (options && options.device === 'smartphone') {
    mobile(options)
  } else {
    desktop(options)
  }
}

export default init
