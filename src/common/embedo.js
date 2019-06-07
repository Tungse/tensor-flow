import Embedo from 'embedo'

export let embedoInst = null

export const initEmbedo = () => {
  embedoInst = new Embedo({
    twitter: true,
    instagram: true,
    pinterest: true,
  })
}
