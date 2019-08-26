/**
 * Find all galleryItems that should have ads and load them.
 * Find all galleryItems that should not have ads and remove them.
 */
const circulateAds = (state, settings) => {
  const itemsThatShouldHaveAds = determineItemsThatShouldHaveAds(state, settings)

  unAssignAds(state, itemsThatShouldHaveAds)
  assignAds(state, itemsThatShouldHaveAds)
}

/**
 * Returns Array with galleryItems that should have ads.
 * @return {Array} [description]
 */
const determineItemsThatShouldHaveAds = (state, settings) => {
  let itemsThatShouldHaveAds = []

  if (settings.adMode === 1) {
    // page before
    if (state.galleryItems[state.currentPage - 2]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage - 2])
    }

    // current page
    if (state.galleryItems[state.currentPage - 1]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage - 1])
    }

    // current page + 1
    if (state.galleryItems[state.currentPage]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage])
    }

    // current page + 2
    if (state.galleryItems[state.currentPage + 1]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage + 1])
    }

    // current page + 3
    if (state.galleryItems[state.currentPage + 2]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage + 2])
    }
  } else {
    // page before
    if (state.galleryItems[state.currentPage - 2]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage - 2])
    }

    // current page
    if (state.galleryItems[state.currentPage - 1]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage - 1])
    }

    // current page + 1
    if (state.galleryItems[state.currentPage]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage])
    }

    // current page + 2
    if (state.galleryItems[state.currentPage + 1]) {
      itemsThatShouldHaveAds.push(state.galleryItems[state.currentPage + 1])
    }
  }

  return itemsThatShouldHaveAds
}

/**
 * For each galleryItem check if it is an "itemThatShouldHaveAds"
 * if not we can remove Ads from it
 * @param  {Array} itemsThatShouldHaveAds
 */
const unAssignAds = (state, itemsThatShouldHaveAds) => {
  state.galleryItems.forEach((elm, index) => {
    if (!itemsThatShouldHaveAds.includes(elm)) {
      const adContainer = elm.querySelector('[data-slotname]')

      if (adContainer && adContainer.getAttribute('data-sdg-ad')) {
        unloadAd(adContainer)
        adContainer.removeAttribute('data-sdg-ad')
      }
    }
  })
}

/**
 * For each itemsThatShouldHaveAds check if it has already an Ad
 * if not we can load it
 * @param  {Array} itemsThatShouldHaveAds
 */
const assignAds = (state, itemsThatShouldHaveAds) => {
  itemsThatShouldHaveAds.forEach((elm, i) => {
    const adContainer = elm.querySelector('[data-slotname]')

    if (adContainer && !adContainer.hasAttribute('data-sdg-ad')) {
      const slotname = adContainer.getAttribute('data-slotname')

      adContainer.setAttribute('data-sdg-ad', slotname)
      loadAd(adContainer)
    }
  })
}

/**
 * Load an ad by dom-element with given "data-sdg-ad"-attribute
 * @param  {Object} adContainer
 */
const loadAd = (adContainer) => {
  try {
    window.adLoader('_loadAds', [adContainer])
  } catch (e) {}
}

/**
 * unload an ad by dom-element with given "data-sdg-ad"-attribute
 * @param  {Object} adContainer
 */
const unloadAd = (adContainer) => {
  try {
    window.adLoader('_removeAds', [adContainer], true)
  } catch (e) {}
}

export default circulateAds
