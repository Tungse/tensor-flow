const getData = (dataSelector) => {
  const galleryContainer = document.querySelector(dataSelector)

  if (galleryContainer === null) {
    return {}
  }

  return JSON.parse(galleryContainer.innerHTML)
}

export default getData
