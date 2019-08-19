import './stylesheets/gallery.scss'
import desktop from './desktop'
import mobile from './mobile.js'

if (process.env.NODE_ENV === 'development') {
  import('./stylesheets/demo.scss')
}

const init = (options) => {
  if (options && options.device === 'smartphone') {
    mobile(options)
  } else {
    desktop(options)
  }
}

export default init
