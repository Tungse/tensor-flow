import store from './store.js'

const getTariffs = () => {
  let timer = 1000

  if (store.get().checked) {
    timer = 0
  }

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}

export default getTariffs
