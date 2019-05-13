export const renderMedia = (item) => {
  switch (item['@type']) {
    case 'ImageObject':
      return `<img class="" src="${item.contentUrl}" alt="">`
    case 'VideoObject':
      return `<iframe class="" src="${item.embedUrl}"></iframe>`
    default:
      return ``
  }
}
