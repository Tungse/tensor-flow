import store from '../store/store.js'

/**
 * render phone plan stage, initially with formular and placeholder for next steps
 */
const renderStage = () => {
  store.get().container.innerHTML = `
    <div class="panel panel-default smb-phone-plan-container">
      <div class="panel-heading smb-phone-plan-header">
        <h3 class="smb-phone-plan-title">Teste deinen Tarif!</h3>
        <img class="smb-phone-plan-logo" src="${store.get().logo}" alt="">
      </div>
      <div class="panel-body">
        <div class="smb-phone-plan-formular">
          <div class="form-group">
            <input type="number" class="form-control" placeholder="Preis pro Monat" value="" data-role="smb-phone-plan-formular-item" data-name="price" data-required="1">
          </div>
          <div class="row">
            <div class="form-group col-sm-6">
              <select class="form-control" data-role="smb-phone-plan-formular-item" data-name="companies" data-required="1">
                <option value="">Netz</option>
                <option value="o2">O2</option>
                <option value="vodafone">Vodafone</option>
                <option value="telekom">Telekom</option>
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
                <option value="10">10GB</option>
              </select>
            </div>
          </div>
          <div class="row form-group clearfix">
            <div class="col-sm-6">
              <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-formular-item" data-name="lte">
              <label class="custom-control-label">&nbsp;LTE</label>
            </div>
            <div class="col-sm-6">
              <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-formular-item" data-name="flatrate">
              <label class="custom-control-label">&nbsp;Telefon Flatrate</label>
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

export default renderStage
