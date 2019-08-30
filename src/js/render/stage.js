import store from '../store/store.js'

const renderStage = () => {
  store.get().container.innerHTML = `
    <div class="smb-phone-plan-container">
      <div class="smb-phone-plan-header">
        <h3 class="smb-phone-plan-title">Teste deinen Tarif!</h3>
        <img class="smb-phone-plan-logo" src="https://www.giga.de/static-local/dist/assets/images/logos/giga.svg" alt="">
      </div>
      <div class="smb-phone-plan-formular" data-role="smb-phone-plan-formular">
       <div class="form-group">
          <select class="form-control" data-role="smb-phone-plan-providers" required>
            <option value="">Netz</option>
            <option>O2</option>
            <option>Vodafone</option>
            <option>Telekom</option>
          </select>
        </div>
        <div class="form-group">
          <select class="form-control" data-role="smb-phone-plan-volume" required>
            <option value="">Datenvolumen</option>
            <option>unter 1GB</option>
            <option>1GB</option>
            <option>2GB</option>
            <option>3GB</option>
            <option>4GB</option>
            <option>5GB</option>
            <option>10GB</option>
          </select>
        </div>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Preis pro Monat" value="" data-role="smb-phone-plan-price" required>
        </div>
        <div class="form-group clearfix">
          <div class="col-md-6">
            <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-lte">
            <label class="custom-control-label">&nbsp;LTE</label>
          </div>
          <div class="col-md-6">
            <input type="checkbox" class="custom-control-input" data-role="smb-phone-plan-flatrate">
            <label class="custom-control-label">&nbsp;Telefon Flatrate</label>
          </div>
        </div>
        <button class="btn btn-primary btn-block" data-role="smb-phone-plan-check">Jetzt prüfen!</button>
      </div>
      <div class="smb-phone-plan-processing" data-role="smb-phone-plan-processing"></div>
      <div class="smb-phone-plan-result" data-role="smb-phone-plan-result"></div>
      <div class="smb-phone-plan-deals" data-role="smb-phone-plan-deals"></div>
    </div>
  `
}

export default renderStage
