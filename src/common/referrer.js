const getReferrer = () => {
  if (document.referrer.includes(location.protocol + '//' + location.host)) {
    return document.referrer
  } else {
    return null
  }
}

export default getReferrer
