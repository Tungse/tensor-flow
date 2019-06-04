import Embedo from 'embedo'

export let embedoInst = null

export const initEmbedo = () => {
  embedoInst = new Embedo({
    // facebook: {
    //   appId: 'my_app_id',
    //   version: 'v2.10',
    // },
    twitter: true,
    instagram: true,
    pinterest: true,
  })
}
