import Embedo from 'embedo'

export let embedoInst = null

export const initEmbedo = () => {
  try {
    embedoInst = new Embedo({
      facebook: {
        version: 'v2.10',
      },
      twitter: true,
      instagram: true,
      pinterest: true,
    })
  } catch (e) {
    console.warn('error: embedo.initEmbedo()', e)
  }
}
