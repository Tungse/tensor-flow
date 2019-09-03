import store from '../store/store.js'
import * as track from '../common/tracking.js'
import { validateEmail } from '../common/validation.js'

/**
 * render user result
 */
const renderResult = () => {
  const content = getContentByResult()
  const result = document.querySelector('[data-role="smb-phone-plan-result"]')

  if (result) {
    result.innerHTML = `
      <hr />
      <h3 class="">Dein Ergebnis</h3>
      <div class="smb-phone-plan-progress">
        <div class="smb-phone-plan-progress-bar ${content.progressClass}" data-role="smb-phone-plan-progress-bar"></div>
      </div>
      ${store.get().resultCategory < 2 ? `
        <strong>Dein Tarif ist ${content.categoryText}. Du zahlst ${store.get().priceDiffence}€ zu viel im Monat. Hier gibt es bessere Alternativen:</strong>
      ` : `
        <strong>Herzlichen Glückwünsch. Du hast einen tollen Tarif.</strong>
        ${store.get().emailSended === false ? `
          <hr />
          <div data-role="smb-phone-plan-email">
            <p>Schick mir eine E-Mail wenn es ein besseres Angebot gibt.</p>
            <div class="row">
              <div class="form-group col-sm-6">
                <div class="input-group">
                  <div class="input-group-addon">@</div>
                  <input type="email" class="form-control" data-role="smb-phone-plan-email-input" placeholder="E-Mail">
                </div>
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
    progressClass: 'bg-danger',
  }

  if (store.get().resultCategory === 1) {
    content.categoryText = 'ok'
    content.progressClass = 'bg-warning'
  }

  if (store.get().resultCategory === 2) {
    content.categoryText = 'gut'
    content.progressClass = 'bg-success'
  }

  return content
}

/**
 * workaround to animate progress bar
 * @param progressWidth
 */
const setProgressBarTransition = (progressWidth) => {
  const progressBar = document.querySelector('[data-role="smb-phone-plan-progress-bar"]')

  setTimeout(() => {
    progressBar.style.width = `${progressWidth}%`
  }, 100)
}

/**
 * event listerner for send email button
 */
const listenToSendEmailClick = () => {
  const sendButton = document.querySelector('[data-role="smb-phone-plan-send-email"]')

  if (sendButton === null) {
    return
  }

  sendButton.addEventListener('click', () => {
    const emailForm = document.querySelector('[data-role="smb-phone-plan-email"]')
    const email = document.querySelector('[data-role="smb-phone-plan-email-input"]')

    if (emailForm === null || email === null) {
      return
    }

    if (validateEmail(email.value) === false) {
      email.parentElement.classList.add('has-error')
      return
    }

    emailForm.innerHTML = `<p>Vielen Dank.</p>`
    store.set({ emailSended: true })
    track.sendEmail()
  })
}

export default renderResult
