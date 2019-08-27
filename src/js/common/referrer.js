const getReferrer = () => {
  if (isContentIdInSessionStorage() && document.referrer) {
    return document.referrer
  }

  return null
}

const isContentIdInSessionStorage = () => {
  const via = JSON.parse(window.sessionStorage.getItem('smb_via'))

  if (via && window.smbContext) {
    return String(via.targetId) === String(window.smbContext.content.id)
  }

  return false
}

export default getReferrer
