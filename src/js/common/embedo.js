import Embedo from 'embedo'

export let embedoInst = null

export const initEmbedo = () => {
  embedoInst = new Embedo({
    facebook: {
      version: 'v2.10',
    },
    twitter: true,
    instagram: true,
    pinterest: true,
  })
}
