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
    })
  } catch (e) {}
}

/**
 * add event listerner to track formular interaction. Only one tracking event is fired at all.
 */
export const listenToFormularInteraction = () => {
  if (typeof window.smbt === 'undefined' || formularInteractionTracked) {
    return
  }

  const formularItems = document.querySelectorAll('[data-role="smb-phone-plan-formular-item"]')

  for (let i = 0; i < formularItems.length; i++) {
    const formularItem = formularItems[i]

    formularItem.addEventListener('change', () => {
      onChangeCallback(formularItem)
    })
  }
}

/**
 * track formular interaction only once
 * @param formularItem
 */
const onChangeCallback = (formularItem) => {
  removeFormularInteractionListerner(formularItem)
  if (formularInteractionTracked) {
    return
  }
  formularInteractionTracked = true

  try {
    window.smbt.emit('custom-event', {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: 'clicked',
      eventLabel: eventLabel,
    })
  } catch (e) {}
}

/**
 * remove event listerner for formular interaction
 * @param formularItem
 */
const removeFormularInteractionListerner = (formularItem) => {
  formularItem.removeEventListener('change', () => {
    onChangeCallback(formularItem)
  })
}

// TODO maybe not here but with  Affiliate-CTR-Tracking
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
          eventCategory: eventCategory,
          eventAction: 'clicked',
          eventLabel: eventLabel,
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
