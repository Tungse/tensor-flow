import circulateAds from '../../../src/js/mobile/ads.js'
import store from '../../../src/js/store/store.js'

beforeAll(() => {
  window.adLoader = jest.fn()

  document.body.innerHTML = `
    <div class="smb-gallery-item">
      <div data-slotname="galleryad"></div>
    </div>
    <div class="smb-gallery-item">
      <div data-slotname="galleryad2"></div>
    </div>
    <div class="smb-gallery-item">
      <div data-slotname="galleryad3"></div>
    </div>
    <div class="smb-gallery-item">
      <div data-slotname="galleryad4"></div>
    </div>
    <div class="smb-gallery-item">
      <div data-slotname="galleryad"></div>
    </div>
    <div class="smb-gallery-item">
      <div data-slotname="galleryad2"></div>
    </div>
    <div class="smb-gallery-item">
      <div data-slotname="galleryad3"></div>
    </div>
    <div class="smb-gallery-item">
      <div data-slotname="galleryad4"></div>
    </div>
  `
})

describe('Ads', () => {
  test('are assigned based on current page', () => {
    const state = {
      currentPage: 4,
      galleryItems: document.querySelectorAll('.smb-gallery-item'),
      settings: {
        adMode: 1,
      },
    }

    store.set(state)

    circulateAds()

    // slotnames are applied to ad-containers as "data-sdg-ad"-attribute
    expect(store.get().galleryItems[2].querySelector('[data-slotname]').getAttribute('data-sdg-ad')).toEqual('galleryad3')
    expect(store.get().galleryItems[3].querySelector('[data-slotname]').getAttribute('data-sdg-ad')).toEqual('galleryad4')
    expect(store.get().galleryItems[4].querySelector('[data-slotname]').getAttribute('data-sdg-ad')).toEqual('galleryad')
    expect(store.get().galleryItems[5].querySelector('[data-slotname]').getAttribute('data-sdg-ad')).toEqual('galleryad2')

    // adLoader is called with containers that should load ads
    expect(window.adLoader).toBeCalledWith('_loadAds', [store.get().galleryItems[2].querySelector('[data-slotname]')])
    expect(window.adLoader).toBeCalledWith('_loadAds', [store.get().galleryItems[3].querySelector('[data-slotname]')])
    expect(window.adLoader).toBeCalledWith('_loadAds', [store.get().galleryItems[4].querySelector('[data-slotname]')])
    expect(window.adLoader).toBeCalledWith('_loadAds', [store.get().galleryItems[5].querySelector('[data-slotname]')])
  })

  test('circulate after page change', () => {
    const state = {
      currentPage: 5,
      galleryItems: document.querySelectorAll('.smb-gallery-item'),
      settings: {
        adMode: 1,
      },
    }

    store.set(state)

    circulateAds()

    // slotnames are removed from ad-containers that should not have ads anymore
    expect(store.get().galleryItems[2].querySelector('[data-slotname]').getAttribute('data-sdg-ad')).toEqual(null)

    // adLoader is called with containers that should remove ads
    expect(window.adLoader).toBeCalledWith('_removeAds', [store.get().galleryItems[2].querySelector('[data-slotname]')], true)
  })
})
