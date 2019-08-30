const getRandomFacts = () => {
  const facts = [
    'Gewusst? 81% aller Deutschen benutzen ein Smartphone.',
    'Gewusst? 21% aller Deutschen benutzen ein Smartphone.',
    'Gewusst? 41% aller Deutschen benutzen ein Smartphone.',
    'Gewusst? 61% aller Deutschen benutzen ein Smartphone.',
  ]

  return facts[Math.floor(Math.random() * facts.length)]
}

export const renderProcessing = () => {
  const processing = document.querySelector('[data-role="smb-phone-plan-processing"]')

  if (processing) {
    processing.innerHTML = `
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

export const removeProcessing = () => {
  const processing = document.querySelector('[data-role="smb-phone-plan-processing"]')

  if (processing) {
    processing.remove()
  }
}
