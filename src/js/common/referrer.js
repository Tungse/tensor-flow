const getReferrer = () => {
  if (isContentIdInSessionStorage() && document.referrer) {
    return document.referrer
  }
  return null
}

const isContentIdInSessionStorage = () => {
  const via = JSON.parse(window.sessionStorage.getItem('smb_via'))
  return via && String(via.targetId) === String(window.smbContext.content.id)
}

export default getReferrer
