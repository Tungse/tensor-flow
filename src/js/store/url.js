export const getPageFromUrl = () => {
  const hashPage = parseInt(location.hash.replace(/^\D+/g, ''))

  if (typeof hashPage === 'number' && hashPage > 0) {
    return hashPage
  } else {
    return null
  }
}

const getInitalPage = (galleryLength) => {
  const initialPage = getPageFromUrl()

  if (typeof initialPage === 'number' && initialPage <= galleryLength) {
    return initialPage
  } else {
    return 1
  }
}

export default getInitalPage
