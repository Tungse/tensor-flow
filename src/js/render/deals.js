import store from '../store/store.js'

const renderDeals = () => {
  const deals = document.querySelector('[data-role="smb-phone-plan-deals"]')

  deals.innerHTML = `
    <ul class="list-group">
      ${store.get().deals.map((deal, index) => `
        <li class="list-group-item">
          <div class="listing-text">
            <h4>${deal.title}</h4>
            <p>${deal.id}</p>
          </div>
          <div class="listing-price">${deal.price}</div>
          <div class="clearfix">
            <div class="better-options pull-left">
              ${deal.options.map((option, index) => `
                <span>${option}</span>
              `.trim()).join('')}
            </div>
            <button class="btn btn-primary pull-right">Zum Angebot</button>
          </div>
        </li>
      `.trim()).join('')}
    </ul>
  `
}

export default renderDeals
