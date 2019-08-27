const getData = (dataSelector) => {
  const dataElement = document.querySelector(dataSelector)

  if (dataElement === null) {
    throw 'data element not found'
  }

  const data = dataElement.innerHTML
  if (data.trim().length === 0) {
    throw 'data is empty'
  }

  return JSON.parse(data)
}

export default getData
