const getReferrer = () => {
  if (document.referrer.indexOf(location.protocol + '//' + location.host) === 0) {
    return document.referrer
  } else {
    return null
  }
}

export default getReferrer
