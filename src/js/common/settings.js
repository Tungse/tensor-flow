const defaults = {
  iamMode: 2,
  dataSelector: '#galleryData',
  endcardSelector: '#endcardData',
  stageSelector: '#galleryStage',
  contentSelector: '#galleryContent',
  nextIcon: '<i class="fas fa-angle-right"></i>',
  prevIcon: '<i class="fas fa-angle-left"></i>',
}

const getSettings = (options) => {
  return Object.assign({}, defaults, options)
}

export default getSettings
