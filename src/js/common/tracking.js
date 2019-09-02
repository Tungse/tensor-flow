import store from '../store/store.js'
import Observer from 'smb-element-observer'

export const embed = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: '',
      eventAction: 'embed',
      eventLabel: '',
      dimension39: '',
      nonInteraction: true,
    })
  } catch (e) {}
}

export const listenToVisibleEvent = () => {
  if (typeof window.smbt === 'undefined') {
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
        nonInteraction: true,
      })
    } catch (e) {}
  })
}

export const checkButtonClick = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: '',
      eventAction: 'clicked',
      eventLabel: '',
      dimension39: '',
    })
  } catch (e) {}
}

export const listenToAffiliateLinkClick = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  const links = document.querySelectorAll('[role="smb-phone-plan-affiliate-link"]')
  if (links.length === 0) {
    return
  }

  links.forEach((link) => {
    link.addEventListener('click', function () {
      try {
        window.smbt.emit('custom-event', {
          hitType: 'event',
          eventCategory: '',
          eventAction: 'clicked',
          eventLabel: '',
          dimension39: '',
        })
      } catch (e) {}
    })
  })
}

export const sendEmail = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: '',
      eventAction: 'clicked',
      eventLabel: '',
      dimension39: '',
    })
  } catch (e) {}
}
