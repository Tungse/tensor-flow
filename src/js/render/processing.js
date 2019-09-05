import store from '../store/store.js'

/**
 * return random facts
 * @returns {string}
 */
const getRandomFacts = () => {
  const facts = [
    '57 Millionen Deutsche besitzen ein Smartphone. (Quelle: statista)',
    '43% der 20 bis 29-Jährigen in Deutschland nutzen ihr Smartphone mehr als 120 Minuten täglich. (Quelle: statista)',
    'Die Netzabdeckung mit 4G liegt in Deutschland bei 65%, in Norwegen bei 92%. (Quelle: statista)',
  ]

  return facts[Math.floor(Math.random() * facts.length)]
}

/**
 * render processing with a random fact
 */
export const renderProcessing = () => {
  const container = store.get().container.querySelector('[data-role="smb-phone-plan-processing"]')

  if (container) {
    container.innerHTML = `
      <hr />
      <div class="smb-phone-plan-loading-dot-container text-center">
        <p>
          <span class="smb-phone-plan-loading-dot"></span>
          <span class="smb-phone-plan-loading-dot"></span>
          <span class="smb-phone-plan-loading-dot"></span>
        </p>
      </div>
      <p class="text-center">${getRandomFacts()}</p>
    `
  }
}

/**
 * remove processing
 */
export const removeProcessing = () => {
  const processing = store.get().container.querySelector('[data-role="smb-phone-plan-processing"]')

  if (processing) {
    processing.remove()
  }
}
