const defaults = {
  mode: 'dark',
}

const init = (options) => {
  const settings = Object.assign({}, defaults, options)

  console.log(settings)
}

export default { init: init }
