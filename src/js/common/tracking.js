import store from '../store/store.js'
import Observer from 'smb-element-observer'

export const embed = () => {
  if (typeof window.smbt === 'undefined' || !window.smbContext) {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: '',
      eventAction: 'embed',
      eventLabel: '',
      dimension39: '',
      metric75: 1,
      nonInteraction: true,
    })
  } catch (e) {}
}

export const listenToVisibleEvent = () => {
  if (typeof window.smbt === 'undefined' || !window.smbContext) {
    return
  }

  Observer.once(store.get().container, () => {
    try {
      window.smbt.emit('custom-event', {
        hitType: 'event',
        eventCategory: '',
        eventAction: 'visible',
        eventLabel: '',
        dimension39: '',
        metric75: 1,
        nonInteraction: true,
      })
    } catch (e) {}
  })
}

export const listenToClickEvents = () => {
  if (typeof window.smbt === 'undefined' || store.get().referrer === null) {
    return
  }

  const referrerButton = document.querySelector('[role="smb-gallery-referrer"]')
  if (referrerButton === null) {
    return
  }

  referrerButton.addEventListener('click', function () {
    try {
      window.smbt.emit('itemstream-back-btn-clicked', { currentPage: store.get().currentPage })
    } catch (e) {}
  })
}
