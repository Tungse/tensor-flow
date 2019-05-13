import './stylesheets/demo.scss'
import desktop from './desktop.js'
import mobile from './mobile.js'

/**
 * [init description]
 * @param  {[type]} options [description]
 * @param  {[type]} smbContext [description]
 * @return {[type]}         [description]
 */
const init = (options, smbContext) => {
  if (smbContext.device.category === 'desktop') {
    desktop(options, smbContext)
  } else {
    mobile(options, smbContext)
  }
}

export default { init: init }
