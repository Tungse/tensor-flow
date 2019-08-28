const getData = (dataSelector) => {
  const dataElement = document.querySelector(dataSelector)

  if (dataElement === null) {
    throw new Error('data element not found')
  }

  const data = dataElement.innerHTML
  if (data.trim().length === 0) {
    throw new Error('data is empty')
  }

  return JSON.parse(data)
}

export default getData
