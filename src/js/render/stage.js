import store from '../store/store.js'

/**
 * render phone plan stage, initially with formular and placeholder for next steps
 */
export const renderStage = () => {
  store.get().container.innerHTML = `
    <div class="smb-phone-plan-container">
      <div class="smb-phone-plan-header">
        <h2 class="smb-phone-plan-title">Wie gut ist dein Handyvertrag?</h2>
        ${store.get().logo ? `
          <img class="smb-phone-plan-logo" src="${store.get().logo}" alt="">
        ` : ``}
      </div>
      <div class="smb-phone-plan-body">
        <div class="smb-phone-plan-formular" data-role="smb-phone-plan-formular">
          <div class="form-group input-group">
            <input type="number" class="form-control" placeholder="Wieviel zahlst du pro Monat?" value="" data-role="smb-phone-plan-formular-item" data-name="price" data-required="1">
            <div class="input-group-addon">€</div>
          </div>
          <div class="row">
            <div class="form-group col-sm-6">
              <select class="form-control" data-role="smb-phone-plan-formular-item" data-name="provider" data-required="1">
                <option value="">Netz</option>
                <option value="d1">Telekom (D1)</option>
                <option value="d2">Vodafone (D2)</option>
                <option value="telefónica">Telefónica (O2)</option>
              </select>
            </div>
            <div class="form-group col-sm-6">
              <select class="form-control" data-role="smb-phone-plan-formular-item" data-name="volume" data-required="1">
                <option value="">Datenvolumen</option>
                <option value="0.5">unter 1GB</option>
                <option value="1">1GB</option>
                <option value="2">2GB</option>
                <option value="3">3GB</option>
                <option value="4">4GB</option>
                <option value="5">5GB</option>
                <option value="6">6GB</option>
                <option value="8">8GB</option>
                <option value="10">10GB</option>
              </select>
            </div>
          </div>
          <div class="row form-group clearfix">
            <div class="col-sm-6">
              <label class="custom-control-label">
                <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-formular-item" data-name="lte">
                &nbsp;LTE
              </label>
            </div>
            <div class="col-sm-6">
              <label class="custom-control-label">
                <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-formular-item" data-name="flatrate">
                &nbsp;Telefon-Flatrate
              </label>
            </div>
          </div>
          <button class="btn btn-primary btn-block" data-role="smb-phone-plan-check">Jetzt prüfen!</button>
        </div>
        <div class="smb-phone-plan-processing" data-role="smb-phone-plan-processing"></div>
        <div class="smb-phone-plan-result" data-role="smb-phone-plan-result"></div>
        <div class="smb-phone-plan-deals" data-role="smb-phone-plan-deals"></div>
      </div>
    </div>
  `
}

/**
 * remove blur class of formular
 */
export const unBlurFormular = () => {
  const formular = store.get().container.querySelector('[data-role="smb-phone-plan-formular"]')

  if (formular === null || formular.classList.contains('blur') === false) {
    return
  }

  formular.classList.remove('blur')
}

/**
 * add blur class to formular
 */
export const blurFormular = () => {
  const formular = store.get().container.querySelector('[data-role="smb-phone-plan-formular"]')

  if (formular === null || formular.classList.contains('blur')) {
    return
  }

  formular.classList.add('blur')
}
