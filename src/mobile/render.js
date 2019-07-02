import Filer from 'filer-js-sdk'

/**
 * Build template string for gallery
 * @return {string} template string
 */
const renderGalleryItems = (state) => {
  return `
      <div class="smb-gallery-mobile">
      ${state.data.itemListElement.map((page, i) => `
        <div class="smb-gallery-item">
          <div class="smb-gallery-media ${page.item['@type']}">
            ${renderMedia(page.item)}
          </div>
          ${page.item.copyrightHolder ? `
          <div class="smb-gallery-info">
            <small>Bildquelle: ${page.item.copyrightHolder}</small>
          </div>
          ` : ''}
          <div class="smb-gallery-content">
          ${i === 0 ? `
            <h1>${page.item.headline}</h1>
          ` : `
            <h2>${page.item.headline}</h2>
          `}
            ${page.item.description}
          </div>
          <div class="smb-gallery-ed-container">
            <div data-slotname="${getSlotName(i)}"></div>
          </div>
        </div>
    `.trim()).join('')}
    </div>
  `
}

/**
 * Build templates-strings for different media items
 * @return {string}
 */
const renderMedia = (item) => {
  switch (item['@type']) {
    case 'ImageObject':
      return `
        ${item.width > 0 && item.height > 0 ? `
          <div class="embed-responsive" style="padding-bottom: ${item.height / item.width * 100}%">
            <img class="embed-responsive-item lazyload" data-src="${Filer.createVariantUrl(item.contentUrl, [['rcm', 480, 0, 'u']])}" alt="">
          </div>
        ` : `
          <img class="lazyload" data-src="${Filer.createVariantUrl(item.contentUrl, [['rcm', 480, 0, 'u']])}" alt="">
        `}
      `
    case 'VideoObject':
      return `<iframe class="lazyload" data-src="${item.embedUrl}"></iframe>`
    case 'SocialMediaPosting':
      return `<div data-role="embedo" data-url="${item.sharedContent.url}"></div>`
  }
}

/**
 * Find slotname by index
 * @param  {Int} i
 * @return {String}
 */
const getSlotName = (i) => {
  switch (i % 4) {
    case 0:
      return 'galleryad'
    case 1:
      return 'galleryad2'
    case 2:
      return 'galleryad3'
    case 3:
      return 'galleryad4'
  }
}

export default renderGalleryItems
