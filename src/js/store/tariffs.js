import store from './store.js'
import xml2js from 'xml2js'

const getTariffs = () => {
  let timer = 1000

  if (store.get().checked) {
    timer = 0
  }

  return new Promise(function (resolve, reject) {
    if (store.get().tariffs.length > 0) {
      resolve()
    }
    const request = new XMLHttpRequest()
    request.open('GET', store.get().endpoint, true)
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = convertXMLToJSON(request.responseXML)
        store.set({ tariffs: cleanData(data) })
        resolve()
      }
    }
    request.send(null)
  })
}

const convertXMLToJSON = (xmlData) => {
  const parser = new xml2js.Parser()
  parser.parseString(xmlData, function (err, data) {
    console.error(err, data)
  })
}

const cleanData = (data) => {
  return data
}

export default getTariffs
