import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'placeLocator',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PlaceLocatorContainer = require('./containers/PlaceLocatorContainer').default

      const reducerPlaceLocator = require('./modules/placeLocator').default
      const reducerGps = require('../../modules/gps').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'placeLocator', reducer: reducerPlaceLocator })
      injectReducer(store, { key: 'gps', reducer: reducerGps })

      /*  Return getComponent   */
      cb(null, PlaceLocatorContainer)

      /* Webpack named bundle   */
    }, 'placeLocator')
  }
})
