import { getPageFromUrl } from './url.js'

const getInitalPage = (galleryLength) => {
  const initialPage = getPageFromUrl()

  if (typeof initialPage === 'number' && initialPage <= galleryLength) {
    return initialPage
  } else {
    return 1
  }
}

export default getInitalPage
