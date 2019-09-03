import store from '../store/store.js'
import Observer from 'smb-element-observer'

let formularInteractionTracked = false
const eventLabel = window.location.href
const eventCategory = 'Smartphone Rate Calculator'

/**
 * track module embed event
 */
export const embed = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: 'embed',
      eventLabel: eventLabel,
      nonInteraction: true,
      metric82: 1,
    })
  } catch (e) {}
}

/**
 * add event listerner to track module visible event
 */
export const listenToVisibleEvent = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  Observer.once(store.get().container, () => {
    try {
      window.smbt.emit('custom-event', {
        hitType: 'event',
        eventCategory: eventCategory,
        eventAction: 'visible',
        eventLabel: eventLabel,
        nonInteraction: true,
        metric83: 1,
      })
    } catch (e) {}
  })
}

/**
 * track check button clicked
 */
export const checkButtonClick = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: 'Check button clicked',
      eventLabel: eventLabel,
      metric85: 1,
    })
  } catch (e) {}
}

/**
 * add event listerner to track formular value changed
 */
export const listenToFormularInputChanged = (formularItem) => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  formularItem.addEventListener('change', () => {
    removeFormularInteractionListerner(formularItem)
    trackFormularInputChanged()
  })
}

/**
 * track formular interaction only once
 */
const trackFormularInputChanged = () => {
  if (formularInteractionTracked) {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: 'clicked',
      eventLabel: eventLabel,
      metric84: 1,
    })
  } catch (e) {}

  formularInteractionTracked = true
}

/**
 * remove event listerner for formular interaction
 * @param formularItem
 */
const removeFormularInteractionListerner = (formularItem) => {
  formularItem.removeEventListener('change', () => {
    removeFormularInteractionListerner(formularItem)
    trackFormularInputChanged()
  })
}

/**
 * add event listerner to track click event on affiliate links
 */
export const listenToAffiliateLinkClick = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  const links = document.querySelectorAll('[data-role="smb-phone-plan-affiliate-link"]')
  if (links.length === 0) {
    return
  }

  links.forEach((link, index) => {
    link.addEventListener('click', function () {
      try {
        window.smbt.emit('custom-event', {
          hitType: 'event',
          eventCategory: eventCategory,
          eventAction: `Offer button ${index + 1} clicked`,
          eventLabel: eventLabel,
          metric86: 1,
        })
      } catch (e) {}
    })
  })
}

/**
 * track user result
 * @param categoryText
 */
export const result = (categoryText) => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: `Current contract ${categoryText}`,
      eventLabel: eventLabel,
    })
  } catch (e) {}
}

/**
 * track email sended
 */
export const sendEmail = () => {
  if (typeof window.smbt === 'undefined') {
    return
  }

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: 'Mail address added',
      eventLabel: eventLabel,
    })
  } catch (e) {}
}
