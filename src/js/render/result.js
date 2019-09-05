import store from '../store/store.js'
import * as track from '../common/tracking.js'
import { validateEmail } from '../common/validation.js'

/**
 * render user result
 */
const renderResult = () => {
  const content = getContentByResult()
  const container = store.get().container.querySelector('[data-role="smb-phone-plan-result"]')

  if (container) {
    container.innerHTML = `
      <hr />
      <h3 class="">Dein Ergebnis</h3>
      <div class="smb-phone-plan-progress">
        <div class="smb-phone-plan-progress-bar ${content.progressClass}" data-role="smb-phone-plan-progress-bar"></div>
        <i class="smb-phone-plan-thumb-icon ${content.thumbIconClass}" data-role="smb-phone-plan-thumb-icon"></i>
      </div>
      ${store.get().resultCategory === 0 ? `
        <p><strong>Dein Tarif ist ${content.categoryText}. Du zahlst ${store.get().priceDiffence}€ zu viel im Monat.</strong></p>
        <p><strong>Hier gibt es bessere Alternativen:</strong></p>
      ` : `
        <strong>Herzlichen Glückwünsch, du hast einen tollen Tarif!</strong>
        ${store.get().emailSended === false ? `
          <hr />
          <div data-role="smb-phone-plan-email">
            <p>Informiere mich per E-Mail, wenn es ein besseres Angebot gibt!</p>
            <div class="row">
              <div class="form-group col-sm-6">
                <input type="email" class="form-control" data-role="smb-phone-plan-email-input" placeholder="E-Mail-Adresse">
              </div>
              <div class="form-group col-sm-6">
                <button class="btn btn-primary btn-block" data-role="smb-phone-plan-send-email">Absenden</button>
              </div>
            </div>
          </div>
        ` : ``}
      `}
    `

    setProgressBarTransition(store.get().resultPercent)
    setThumbIconShake()
    listenToSendEmailClick()
    track.result(content.categoryText)
  }
}

/**
 * return result content by user's result category
 * @returns {{progressClass: string, categoryText: string}}
 */
const getContentByResult = () => {
  let content = {
    categoryText: 'schlecht',
    thumbIconClass: 'icon-thumbs-down',
    progressClass: 'smb-phone-plan-danger',
  }

  if (store.get().resultCategory === 1) {
    content.categoryText = 'gut'
    content.thumbIconClass = 'icon-thumbs-up'
    content.progressClass = 'smb-phone-plan-success'
  }

  return content
}

/**
 * workaround to animate progress bar
 * @param progressWidth
 */
const setProgressBarTransition = (progressWidth) => {
  const progressBar = store.get().container.querySelector('[data-role="smb-phone-plan-progress-bar"]')

  if (progressBar === null) {
    return
  }

  setTimeout(() => {
    progressBar.style.width = `${progressWidth}%`
  }, 100)
}

/**
 * add shake class to thumb icon
 */
const setThumbIconShake = () => {
  const thumbIcon = store.get().container.querySelector('[data-role="smb-phone-plan-thumb-icon"]')

  if (thumbIcon === null) {
    return
  }

  setTimeout(() => {
    thumbIcon.classList.add('shake')
  }, 1000)
}

/**
 * event listerner for send email button
 */
const listenToSendEmailClick = () => {
  const sendButton = store.get().container.querySelector('[data-role="smb-phone-plan-send-email"]')

  if (sendButton === null) {
    return
  }

  sendButton.addEventListener('click', () => {
    const emailForm = store.get().container.querySelector('[data-role="smb-phone-plan-email"]')
    const email = store.get().container.querySelector('[data-role="smb-phone-plan-email-input"]')

    if (emailForm === null || email === null) {
      return
    }

    if (validateEmail(email.value) === false) {
      email.parentElement.classList.add('has-error')
      return
    }

    emailForm.innerHTML = `<p>Vielen Dank! Du erhältst von uns eine E-Mail, sobald wir ein Angebot mit den gleichen Konditionen zu einem besseren Preis finden. Bis dahin kannst du entspannt deinen Tarif weiternutzen.</p>`
    store.set({ emailSended: true })
    track.sendEmail()
  })
}

export default renderResult
