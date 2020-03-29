import '../scss/main.scss'
import store from './store/store.js'
import * as render from './render/stage.js'
import * as tensorflow from '@tensorflow/tfjs'

/**
 * init function to init store
 * @param options
 */
const init = (options) => {
  store.init(options)
  render.stage()

  const model = tensorflow.sequential()
  model.add(tensorflow.layers.dense({units: 1, inputShape: [1]}))

  model.compile({loss: 'meanSquaredError', optimizer: 'sgd'})

// Generate some synthetic data for training.
  const xs = tensorflow.tensor2d([1, 2, 3, 4], [4, 1])
  const ys = tensorflow.tensor2d([1, 3, 5, 7], [4, 1])

// Train the model using the data.
  model.fit(xs, ys, {epochs: 10}).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    model.predict(tensorflow.tensor2d([5], [1, 1])).print()
    // Open the browser devtools to see the output
  })
}

export default init
