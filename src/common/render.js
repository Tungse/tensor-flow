export const renderMedia = (item) => {
  switch (item['@type']) {
    case 'ImageObject':
      return `
        ${item.width > 0 && item.height > 0 ? `
          <div class="embed-responsive" style="padding-bottom: ${item.width / item.height * 100}%">
            <img class="embed-responsive-item lazy" data-src="${item.contentUrl}" alt="">
          </div>
        ` : `
          <img class="lazy" data-src="${item.contentUrl}" alt="">
        `}
      `
    case 'VideoObject':
      return `<iframe class="lazy" data-src="${item.embedUrl}"></iframe>`
    default:
      return ``
  }
}
