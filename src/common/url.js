export const getPageFromUrl = () => {
  const hashPage = parseInt(location.hash.replace(/^\D+/g, ''))

  if (typeof hashPage === 'number' && hashPage > 0) {
    return hashPage
  } else {
    return null
  }
}
