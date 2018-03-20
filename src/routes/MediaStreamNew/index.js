import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'mediaStream',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const MediaStreamNew = require('./containers/MediaStreamNewContainer').default
      const reducer = require('./modules/mediaStreamNew').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'mediaStream', reducer })

      /*  Return getComponent   */
      cb(null, MediaStreamNew)

    /* Webpack named bundle   */
  }, 'mediaStream')
  }
})
