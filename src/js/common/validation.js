import store from '../store/store.js'

/**
 * validate formular and return input values
 * @returns {{}}
 */
export const validateFormularData = () => {
  let error = false
  let formularData = {}
  const formularItems = store.get().container.querySelectorAll('[data-role="smb-phone-plan-formular-item"]')

  for (let i = 0; i < formularItems.length; i++) {
    const formularItem = formularItems[i]
    const name = formularItem.dataset.name
    const required = formularItem.dataset.required

    if (required && formularItem.value === '') {
      error = true
      formularItem.parentElement.classList.add('has-error')
    } else {
      formularItem.parentElement.classList.remove('has-error')
    }

    if (formularItem.type === 'checkbox') {
      formularData[name] = formularItem.checked
    } else {
      formularData[name] = formularItem.value
    }
  }

  if (error) {
    return {}
  }

  return formularData
}

/**
 * validate email input
 * @param email
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/
  return regex.test(email)
}
