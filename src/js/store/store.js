let store = {}

const defaultOptions = {}

/**
 * init store with default options
 * @param options
 */
const init = (options) => {
  const settings = Object.assign({}, defaultOptions, options)

  set({})
}

/**
 * return store object
 */
const get = () => {
  return store
}

/**
 * set store
 * @param action
 */
const set = (action) => {
  store = Object.assign({}, store, action)
}

export default {
  get,
  set,
  init,
}
