import store from '../store/store.js'
import * as track from '../common/tracking.js'

/**
 * render list of deals
 */
const renderDeals = () => {
  const container = store.get().container.querySelector('[data-role="smb-phone-plan-deals"]')

  if (container === null) {
    return
  }

  if (store.get().deals.length === 0) {
    container.innerHTML = ``
  } else {
    container.innerHTML = `
      <ul class="list-group smb-phone-plan-deals-list">
        ${store.get().deals.map((deal, index) => `
          <li class="list-group-item smb-phone-plan-deal-item clearfix">
            <div class="col-sm-8">
              <h4 class="smb-phone-plan-deal-title">${deal.title}</h4>
              ${deal.productInfoUrl ? `
                  <p><a href="${deal.productInfoUrl}" target="_blank">${deal.product}</a></p>
                ` : `
                  <p>${deal.product}</p>
                `}
            </div>
            <div class="col-sm-4">
              <div class="text-center smb-phone-plan-deal-price">${deal.price}€</div>
              <a class="btn btn-primary btn-block" data-role="smb-phone-plan-affiliate-link" href="${deal.link}" target="_blank">Zum Angebot</a>
            </div>
          </li>
        `.trim()).join('')}
      </ul>
    `

    track.listenToAffiliateLinkClick()
  }
}

export default renderDeals
