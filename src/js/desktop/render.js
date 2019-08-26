import Filer from '../../../node_modules/filer-js-sdk/dist/filer.js'

/**
 * Renders Stage depending on current state
 * @return {string} template string
 */
export const renderStage = (state, settings) => {
  const prevPage = state.data.itemListElement[state.currentPage - 2]
  const page = state.data.itemListElement[state.currentPage - 1]
  const nextPage = state.data.itemListElement[state.currentPage]

  // on last page (endcard), we dont show stage
  if (state.currentPage === state.length) {
    return ''
  }

  return `
    <div class="smb-gallery-stage smb-gallery-desktop">
      <h2>${page.item.headline}</h2>
      <div class="smb-gallery-header">
        ${state.currentPage > 1 ? `
          <a role="smb-gallery-prev" class="smb-gallery-nav smb-gallery-nav-left" href="${prevPage.item.url}">
            <div class="smb-gallery-button">
              ${settings.prevIcon}
            </div>
          </a>
        ` : ''}
        <div class="smb-gallery-media ${page.item['@type']}">
          ${renderMedia(page.item)}
        </div>
        ${state.currentPage < state.length ? `
          <a role="smb-gallery-next" class="smb-gallery-nav smb-gallery-nav-right" href="${nextPage.item.url}">
            <div class="smb-gallery-button">
              ${settings.nextIcon}
            </div>
          </a>
        ` : ''}
        <div class="smb-gallery-info">
          ${page.item.copyrightHolder ? `
          <small>Bildquelle: ${page.item.copyrightHolder}</small>
          ` : '<small></small>'}
          <small>${state.currentPage} / ${state.length}</small>
        </div>
      </div>

    </div>
  `
}

/**
 * Renders MediaItem
 * @return {string} template string
 */
const renderMedia = (item) => {
  switch (item['@type']) {
    case 'ImageObject':
      return `
        <div class="embed-responsive" style="padding-bottom: 450px">
          <img class="embed-extended embed-responsive-item" src="${Filer.createVariantUrl(item.contentUrl, [['rcm', 0, 450, 'u']])}" alt="">
        </div>
      `
    case 'VideoObject':
      return `
        ${item.embedUrl.includes('youtube') || item.embedUrl.includes('youtu.be') ? `
          <div class="embed-responsive embed-responsive-16by9">
            <div class="embed-responsive-item" data-embedo-url="${item.embedUrl}"></div>
          </div>
        ` : `
          <div class="embed-responsive embed-responsive-16by9">
            <iframe allowfullscreen class="embed-responsive-item" src="${item.embedUrl}"></iframe>
          </div>
        `}
      `
    case 'SocialMediaPosting':
      return `<div data-embedo-url="${item.sharedContent.url}"></div>`
    default:
      return ``
  }
}

/**
 * Renders Content depending on current state
 * @return {string} template string
 */
export const renderContent = (state, settings) => {
  const page = state.data.itemListElement[state.currentPage - 1]

  return `
    <div class="smg-gallery-body smb-gallery-desktop">
      ${page.item.description}

      <div class="smb-gallery-btn-nav">
        <div>
        ${state.referrer ? `
          <a role="smb-gallery-back" class="btn btn-link smb-gallery-back" href="${state.referrer}"><i class="fas fa-angle-left"></i> zurück zum Artikel</a>
        ` : ''}
        </div>
        <div>
          <a role="smb-gallery-prev" class="btn btn-primary ${state.currentPage === 1 ? 'disabled' : ''}" href="#"><i class="fas fa-angle-left"></i> zurück</a>
          <a role="smb-gallery-next" class="btn btn-primary ${state.currentPage === state.length ? 'disabled' : ''}" href="#">weiter <i class="fas fa-angle-right"></i></a>
        </div>
      </div>
    </div>
  `
}
