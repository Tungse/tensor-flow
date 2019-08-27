import store from '../store/store.js'
import Observer from 'smb-element-observer'

let trackedEmbed = false
let addedVisibleEventListerner = false
let addedClickEventListerner = false

export const pageview = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  window.smbt.emit('itemstream-pageview', {
    currentPage: store.get().currentPage,
    itemsCount: store.get().length,
    locationPath: store.get().data.itemListElement[store.get().currentPage - 1].item.url,
  })
}

export const listenToBackButtonClick = () => {
  if (typeof window.smbt === 'undefined' || store.get().referrer === null) {
    return
  }

  const referrerButton = document.querySelector('[role="smb-gallery-referrer"]')
  if (referrerButton === null) {
    return
  }

  referrerButton.addEventListener('click', function () {
    window.smbt.emit('itemstream-back-btn-clicked', { currentPage: store.get().currentPage })
  })
}

export const endcardEmbed = () => {
  if (typeof window.smbt === 'undefined' || trackedEmbed || !window.smbContext) {
    return
  }

  window.smbt.emit('itemstream-endcard-embed', { oid: window.smbContext.content.id })
  trackedEmbed = true
}

export const listenToEndcardVisible = () => {
  if (typeof window.smbt === 'undefined' || addedVisibleEventListerner || !window.smbContext) {
    return
  }

  const endcardContainer = document.querySelector('[role="smb-gallery-endcard"]')
  if (endcardContainer === null) {
    return
  }

  Observer.once(endcardContainer, () => {
    window.smbt.emit('itemstream-endcard-visible', { oid: window.smbContext.content.id })
  })
  addedVisibleEventListerner = true
}

export const listenToEndcardClick = () => {
  if (typeof window.smbt === 'undefined' || addedClickEventListerner || !window.smbContext) {
    return
  }

  const endcardTeasers = document.querySelectorAll('[role="smb-gallery-endcard-teaser"]')
  if (endcardTeasers.length === 0) {
    return
  }

  endcardTeasers.forEach((endcardTeaser, index) => {
    endcardTeaser.addEventListener('click', function () {
      window.smbt.emit('itemstream-endcard-clicked', {
        id: endcardTeaser.getAttribute('data-post-id'),
        teaserType: 'auto',
        oid: window.smbContext.content.id,
        teaserCount: index,
      })
    })
  })
  addedClickEventListerner = true
}
