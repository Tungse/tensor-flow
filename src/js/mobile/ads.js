import store from '../store/store.js'

/**
 * Find all galleryItems that should have ads and load them.
 * Find all galleryItems that should not have ads and remove them.
 */
const circulateAds = () => {
  const itemsThatShouldHaveAds = determineItemsThatShouldHaveAds()

  unAssignAds(itemsThatShouldHaveAds)
  assignAds(itemsThatShouldHaveAds)
}

/**
 * Returns Array with galleryItems that should have ads.
 * @return {Array} [description]
 */
const determineItemsThatShouldHaveAds = () => {
  let itemsThatShouldHaveAds = []

  // page before
  if (store.get().galleryItems[store.get().currentPage - 2]) {
    itemsThatShouldHaveAds.push(store.get().galleryItems[store.get().currentPage - 2])
  }

  // current page
  if (store.get().galleryItems[store.get().currentPage - 1]) {
    itemsThatShouldHaveAds.push(store.get().galleryItems[store.get().currentPage - 1])
  }

  // current page + 1
  if (store.get().galleryItems[store.get().currentPage]) {
    itemsThatShouldHaveAds.push(store.get().galleryItems[store.get().currentPage])
  }

  // current page + 2
  if (store.get().galleryItems[store.get().currentPage + 1]) {
    itemsThatShouldHaveAds.push(store.get().galleryItems[store.get().currentPage + 1])
  }

  // current page + 3 (only if adMode = 1)
  if (store.get().settings.adMode === 1 && store.get().galleryItems[store.get().currentPage + 2]) {
    itemsThatShouldHaveAds.push(store.get().galleryItems[store.get().currentPage + 2])
  }

  return itemsThatShouldHaveAds
}

/**
 * For each galleryItem check if it is an "itemThatShouldHaveAds"
 * if not we can remove Ads from it
 * @param  {Array} itemsThatShouldHaveAds
 */
const unAssignAds = (itemsThatShouldHaveAds) => {
  store.get().galleryItems.forEach((elm, index) => {
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
const assignAds = (itemsThatShouldHaveAds) => {
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
