const getData = (dataSelector) => {
  const htmlString = document.querySelector(dataSelector).innerHTML

  return JSON.parse(htmlString)
}

export default getData
