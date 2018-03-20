import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'locator',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Locator = require('./containers/LocatorContainer').default
      const reducer = require('./modules/locator').default
      

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'locator', reducer })

      /*  Return getComponent   */
      cb(null, Locator)

    /* Webpack named bundle   */
  }, 'locator')
  }
})
